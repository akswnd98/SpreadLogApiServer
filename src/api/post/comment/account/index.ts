import express, { Request, Response } from 'express';
import { WriteCommentRequest, WriteCommentResponse } from '@/src/common/api/account/post/comment/account';
import { PostComment } from '@/src/db/relations';

const router = express.Router();

router.use('/', (req, res, next) => {
  if (req.session.account === undefined) {
    res.status(404);
  } else {
    next();
  }
});

router.post('/writeComment', async (req: Request<any, WriteCommentResponse, WriteCommentRequest>, res: Response<WriteCommentResponse>) => {
  try {
    console.log('create');
    const rst = await PostComment.create({
      body: req.body.body,
      postId: req.body.postId,
      accountId: req.session.account!.id,
      firstUpload: new Date(Date.now()),
      lastUpdate: new Date(Date.now()),
    });
    res.send({
      id: rst.id!,
      firstUpload: rst.firstUpload!.toString(),
    });
    res.end();
  } catch (e) {
    console.log(e);
    res.status(404);
    res.end();
  }
});

export default router;
