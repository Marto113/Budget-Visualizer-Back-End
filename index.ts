
import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import AuthService from './auth/auth.service';
import authRouter from './auth/auth.routes';
import userRouter from './user/user.routes';
// import transactionRouter from './transactions/transaction.routes';
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

app.post('/user/register', userRouter);

// app.post('/add-transaction', transactionRouter);

app.get('/user/balance', userRouter);

app.post('/user/balance', userRouter);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server: http://localhost:${port}`);
});