
import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import authRouter from './auth/auth.routes';
import userRouter from './user/user.routes';
import transactionRouter from './transactions/transaction.routes';

const cookieParser = require('cookie-parser');

const cors = require('cors');
const credentials = {
    origin:'http://localhost:3000', 
    credentials:true,
    optionSuccessStatus:200
}

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(cors(credentials));
app.use(express.json());

app.post('/auth/login', authRouter);
app.post('/auth/refresh-token', authRouter);
app.post('/auth/register', authRouter);

app.get('/user/balance', userRouter);
app.post('/user/balance', userRouter);
app.put('/user/balance', userRouter);

app.post('/transactions', transactionRouter);
app.delete('/transactions', transactionRouter);
app.get('/transactions', transactionRouter);
app.get('/transactions/month', transactionRouter);
app.get('/transactions/category', transactionRouter);
app.get('/transactions/categories', transactionRouter);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server: http://localhost:${port}`);
});