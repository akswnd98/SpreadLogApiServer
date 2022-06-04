import {
  CheckIsLoggedInResponse,
  CheckIsLoggedInRequest,
  LoginResponse,
  LoginRequest,
} from '@/src/common/api/account/email/login';
import express, { Request, Response } from 'express';
import Account from '@/src/db/EmailAccount';
import crypto from 'crypto';

const router = express.Router();

router.post('/', async (req: Request<any, LoginResponse, LoginRequest>, res: Response<LoginResponse>) => {
  try {
    const findRst = await Account.findOne({
      where: {
        email: req.body.email,
        pwHash: crypto.createHash('sha512').update(req.body.pw).digest('base64'),
      },
    });
    if (findRst === null) {
      throw Error('no matching account');
    }
    req.session.account = {
      id: findRst.id!,
      email: findRst.email!,
      pwHash: findRst.pwHash!,
      nickname: findRst.nickname!,
    };
    res.send({ result: true });
  } catch (e) {
    console.log(e);
    res.send({ result: false });
  }
  res.end();
});

router.get('/checkIsLoggedIn', async (req: Request<any, CheckIsLoggedInResponse, any, CheckIsLoggedInRequest>, res: Response<CheckIsLoggedInResponse>) => {
  try {
    res.send({ result: req.session.account !== undefined });
    res.end();
  } catch (e) {
    console.log(e);
  }
});

export default router;
