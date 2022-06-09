import express from 'express';
import signup from './signup';
import login from './login';
import loggedIn from './logged-in';
import logout from './logout';

const router = express.Router();

router.use('/login', login);

router.use('/signup', signup);

router.use('/logged-in', loggedIn);

router.use('/logout', logout);

export default router;
