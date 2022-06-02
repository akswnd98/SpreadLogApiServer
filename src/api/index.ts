import express, { Request, Response } from 'express';
import post from './post';
import image from './image';
import account from './account';

const router = express.Router();

router.use('/post', post);
router.use('/image', image);
router.use('/account', account);

export default router;
