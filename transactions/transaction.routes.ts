import { Router } from 'express';
import TransactionController from './transaction.controller';

const transactionRouter = Router();

transactionRouter.post('/add-transaction', TransactionController.addTransaction);

export default transactionRouter;