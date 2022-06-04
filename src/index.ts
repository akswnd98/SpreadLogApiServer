import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import api from './api';
import session from 'express-session';

dotenv.config();

const app = express();

app.set('trust proxy', 1);

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60,
  },
}));

app.use('/api', api);

app.listen(process.env.API_SERVER_PORT, () => {
  console.log(`started on port ${process.env.API_SERVER_PORT}`);
});
