
import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import AuthService from './auth/auth.service';
import authRouter from './auth/auth.routes';
import userRouter from './user/user.routes';

dotenv.config();

const app = express();

app.use(express.json());

app.post('/auth/login', authRouter);

app.post('/auth/refresh-token', authRouter);

app.post('/user/register', userRouter);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server: http://localhost:${port}`);
});