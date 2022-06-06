import {
  AddNodeRequest,
  AddNodeResponse,
  AddEdgeRequest,
  AddEdgeResponse,
  DeleteEdgeRequest,
  DeleteNodeRequest,
  PublishPostRequest,
} from '@/src/common/api/account/post/account';
import Post from '@/src/db/Post';
import Edge from '@/src/db/Post/Edge';
import express, { Request, Response } from 'express';
import { Op } from 'sequelize';

const router = express.Router();

router.use('/', (req, res, next) => {
  if (req.session.account === undefined) {
    res.status(404);
  } else {
    next();
  }
});

router.post('/addNode', async (req: Request<any, AddNodeResponse, AddNodeRequest>, res: Response<AddNodeResponse>) => {
  try {
    const curDate = new Date(Date.now());
    const post = await Post.create({ title: req.body.title, body: '', firstUpload: curDate, lastUpdate: curDate, accountId: req.session.account!.id });
    res.send({
      id: post.id!,
      firstUpload: post.firstUpload!.toString(),
      lastUpdate: post.lastUpdate!.toString(),
      accountId: post.accountId!,
    });
  } catch (e) {
    console.log(e);
    res.status(404);
  }
});

router.post('/addEdge', async (req: Request<any, AddEdgeResponse, AddEdgeRequest>, res: Response<AddEdgeResponse>) => {
  try {
    const edge = await Edge.create({ fromId: req.body.fromId, toId: req.body.toId, accountId: req.session.account!.id });
    res.send({
      id: edge.id!,
      fromId: edge.fromId!,
      toId: edge.toId!,
      accountId: edge.accountId!,
    });
  } catch (e) {
    console.log(e);
    res.status(404);
  }
});

router.post('/deleteEdge', async (req: Request<any, any, DeleteEdgeRequest>, res) => {
  try {
    await Edge.destroy({ where: { [Op.and]: { id: req.body.id, accountId: req.session.account!.id } } });
    res.end();
  } catch (e) {
    console.log(e);
    res.status(404);
  }
});

router.post('/deleteNode', async (req: Request<any, any, DeleteNodeRequest>, res) => {
  try {
    await Edge.destroy({
      where: {
        [Op.and]: {
          accountId: req.session.account!.id,
          [Op.or]: { fromId: req.body.id, toId: req.body.id },
        },
      },
    });
    await Post.destroy({ where: { id: req.body.id, accountId: req.session.account!.id } });
    res.end();
  } catch (e) {
    console.log(e);
    res.status(404);
  }
});

router.post('/publish', async (req: Request<any, any, PublishPostRequest>, res) => {
  try {
    console.log(req.body);
    await Post.update({
      title: req.body.title,
      body: req.body.body,
    }, {
      where: {
        id: req.body.id,
        accountId: req.session.account!.id,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(404);
  }
  res.end();
});

export default router;
