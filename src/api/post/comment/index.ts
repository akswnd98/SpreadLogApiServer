import { GetCommentsRequest, GetCommentsResponse } from '@/src/common/api/account/post/comment';
import { EmailAccount, PostComment } from '@/src/db/relations';
import express, { Request, Response } from 'express';
import account from './account';

const router = express.Router();

router.use('/account', account);

router.get('/getComments', async (req: Request<any, GetCommentsResponse, any, GetCommentsRequest>, res: Response<GetCommentsResponse>) => {
  try {
    const rst = await PostComment.findAll({
      include: {
        model: EmailAccount,
        as: 'EmailAccount',
        required: true,
      },
      where: {
        postId: req.query.postId,
      },
    });
    const formatted = rst.map((v) => ({
      id: v.id!,
      body: v.body!,
      accountId: v.accountId!,
      accountNickname: v.EmailAccount!.nickname!,
      firstUpload: v.firstUpload!.toString(),
    }));
    res.send({
      list: formatted,
    });
    res.end();
  } catch (e) {
    console.log(e);
    res.status(404);
  }
});

export default router;
