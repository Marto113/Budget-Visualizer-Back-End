import { Router } from 'express';
import TransactionController from './transaction.controller';

const transactionRouter = Router();

transactionRouter.post('/transactions', TransactionController.addTransaction);
transactionRouter.get('/transactions', TransactionController.fetchTransaction);
transactionRouter.delete('/transactions', TransactionController.deleteTransaction);
transactionRouter.get('/transactions/month', TransactionController.fetchTransactionsForMonth);
transactionRouter.get('/transactions/category', TransactionController.getTransactionsCategory);
transactionRouter.get('/transactions/categories', TransactionController.fetchCategories);


export default transactionRouter;