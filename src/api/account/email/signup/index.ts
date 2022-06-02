import {
  CheckEmailAvailableRequest,
  CheckEmailAvailableResponse,
  CheckNicknameAvailableRequest,
  CheckNicknameAvailableResponse,
  RequestEmailCertRequest,
  RequestEmailCertResponse,
  SignUpParams,
} from '@/src/common/api/account/email/signup';
import Account from '@/src/db/EmailAccount';
import express, { Request, Response } from 'express';
import crypto from 'crypto';
import RandomSerialGenerator from './RandomSerialGenerator';
import nodemailer from 'nodemailer';
import PasswdValidChecker from '@/src/common/logic/PasswdValidChecker';

const router = express.Router();

router.get('/checkEmailAvailable', async (req: Request<any, CheckEmailAvailableResponse, any, CheckEmailAvailableRequest>, res: Response<CheckEmailAvailableResponse>) => {
  const findRst = await Account.findOne({ where: { email: req.query.email } });
  res.send({
    available: findRst === null,
  });
  res.end();
});

router.get('/checkNicknameAvailable', async (req: Request<any, CheckNicknameAvailableResponse, any, CheckNicknameAvailableRequest>, res: Response<CheckEmailAvailableResponse>) => {
  const findRst = await Account.findOne({ where: { nickname: req.query.nickname } });
  res.send({
    available: findRst === null,
  });
  res.end();
});

router.post('/requestEmailCert', async (req: Request<any, RequestEmailCertResponse, RequestEmailCertRequest>, res: Response<RequestEmailCertResponse>) => {
  try {
    if (!(new PasswdValidChecker()).check(req.body.pw)) {
      throw Error('pw format error');
    }
    const certSerial = new RandomSerialGenerator().generate();
    const trasnport = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_ADDR,
        pass: process.env.EMAIL_PW,
      },
    });
    await trasnport.sendMail({
      from: process.env.EMAIL_ADDR,
      to: req.body.email,
      subject: '이메일 인증',
      html: `
<div>SpreadLog 입니다</div>
<br>
<div>다음 주소로 이동해서 완료해주세요: http://localhost:8080/api/account/email/signup/${certSerial}</div>
`,
      text: '인증 메일입니다',
    });
    req.session.signup = {
      email: req.body.email,
      pw: req.body.pw,
      nickname: req.body.nickname,
    };
    req.session.signup.certSerial = certSerial;
    res.send({ result: true });
  } catch (e) {
    console.log(e);
    res.send({ result: false });
  }
  res.end();
});

router.get('/:certSerial', async (req: Request<SignUpParams>, res) => {
  try {
    if (req.params.certSerial !== req.session.signup?.certSerial) {
      throw Error('cert serial not matched');
    }
    if (
      await Account.findOne({ where: { email: req.session.signup.email } }) !== null
      || await Account.findOne({ where: { nickname: req.session.signup.nickname } }) !== null
    ) {
      throw Error('user already exist');
    }
    await Account.create({
      email: req.session.signup.email,
      pwHash: crypto.createHash('sha512').update(req.session.signup.pw!).digest('base64'),
      nickname: req.session.signup.nickname,
    });
    res.redirect('/');
  } catch (e) {
    console.log(e);
    res.redirect('/');
  }
  res.end();
});

export default router;