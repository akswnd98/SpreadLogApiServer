import {
  GetAllPostNodesRequest,
  GetAllPostNodesResponse,
  GetAllPostEdgesRequest,
  GetAllPostEdgesResponse,
  GetPostResponse,
  GetPostRequest,
  GetAllPrevPostMetadatasResponse,
  GetAllPrevPostMetadatasRequest,
} from '@/src/common/api/account/post';
import EmailAccount from '@/src/db/EmailAccount';
import { Post, PostEdge } from '@/src/db/relations';
import express, { Request, Response } from 'express';
import account from './account';
import comment from './comment';

const router = express.Router();

router.use('/account', account);

router.use('/comment', comment);

router.get('/getAllPostNodes', async (req: Request<any, GetAllPostNodesResponse, any, GetAllPostNodesRequest>, res: Response<GetAllPostNodesResponse>) => {
  try {
    const accountQueryRst = await EmailAccount.findOne({ where: { nickname: req.query.nickname } });
    if (accountQueryRst === null) throw Error('account not found');
    const accountId = accountQueryRst.id!;
    const queryRst = (await Post.findAll({
      attributes: [
        'id', 'title', 'accountId', 'firstUpload', 'lastUpdate',
      ],
      where: {
        accountId
      }
    })).map((v) => ({
      id: v.id!,
      accountId: v.accountId!,
      title: v.title!,
      body: v.body!,
      firstUpload: v.firstUpload!.toString(),
      lastUpdate: v.lastUpdate!.toString(),
    }));
    res.send({ list: queryRst });
  } catch (e) {
    console.log(e);
    res.status(404);
  }
  res.end();
});

router.get('/getAllPostEdges', async (req: Request<any, GetAllPostEdgesResponse, any, GetAllPostEdgesRequest>, res: Response<GetAllPostEdgesResponse>) => {
  try {
    const accountQueryRst = await EmailAccount.findOne({ where: { nickname: req.query.nickname } });
    if (accountQueryRst === null) throw Error('account not found');
    const accountId = accountQueryRst.id!;
    const queryRst = (await PostEdge.findAll({ where: { accountId }})).map((v) => ({
      id: v.id!,
      accountId: v.accountId!,
      fromId: v.fromId!,
      toId: v.toId!,
    }));
    res.send({ list: queryRst });
  } catch (e) {
    console.log(e);
    res.status(404);
  }
  res.end();
});

router.get('/', async (req: Request<any, GetPostResponse, any, GetPostRequest>, res: Response<GetPostResponse>) => {
  try {
    const post = await Post.findOne({ where: { id: req.query.id } });
    if (post === null) throw Error('no post');
    res.send({
      id: post.id!,
      accountId: post.accountId!,
      title: post.title!,
      body: post.body!,
      firstUpload: post.firstUpload!.toString(),
      lastUpdate: post.lastUpdate!.toString(),
    });
  } catch (e) {
    console.log('GET /api/post failed', e);
  }
  res.end();
});

router.get('/getPrevPosts', async (req: Request<any, GetAllPrevPostMetadatasResponse, any, GetAllPrevPostMetadatasRequest>, res: Response<GetAllPrevPostMetadatasResponse>) => {
  try {
    const rst = await Post.findAll({
      attributes: ['id', 'title'],
      include: {
        model: PostEdge,
        as: 'FromCompare',
        required: true,
        where: {
          toId: req.query.id,
        },
      },
    });
    res.send({
      list: rst.map((v) => ({
        id: v.id!,
        title: v.title!,
      })),
    });
  } catch (e) {
    console.log(e);
  }
  res.end();
});

export default router;
