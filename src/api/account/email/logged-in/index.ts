import { GetLoginInfoResponse } from '@/src/common/api/account/email/logged-in';
import express, { Request, Response } from 'express';

const router = express.Router();

router.use('/', (req, res, next) => {
  if (req.session.account === undefined) {
    res.status(404);
  } else {
    next();
  }
});

router.get('/getLoginInfo', async (req: Request<any, GetLoginInfoResponse>, res: Response<GetLoginInfoResponse>) => {
  try {
    res.send({
      id: req.session.account!.id,
      nickname: req.session.account!.nickname,
    });
  } catch (e) {
    console.log(e);
  }
  res.end();
});

export default router;
