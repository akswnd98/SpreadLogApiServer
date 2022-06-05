import express from 'express';
import signup from './signup';
import login from './login';
import loggedIn from './logged-in';

const router = express.Router();

router.use('/login', login);

router.use('/signup', signup);

router.use('/logged-in', loggedIn);

export default router;
