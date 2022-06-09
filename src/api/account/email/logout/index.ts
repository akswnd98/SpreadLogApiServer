import { LogoutResponse } from '@/src/common/api/account/email/logout';
import { checkAccount } from '@/src/util';
import express, { Request, Response } from 'express';

const router = express.Router();

router.use('/', (req, res, next) => {
  try {
    checkAccount(req);
    next();
  } catch (e) {
    console.log(e);
  }
});

router.post('/', (req: Request<any, LogoutResponse>, res: Response<LogoutResponse>) => {
  try {
    req.session.account = undefined;
    res.send({
      error: true,
    });
    res.end();
  } catch (e) {
    console.log(e);
  }
});

export default router;
