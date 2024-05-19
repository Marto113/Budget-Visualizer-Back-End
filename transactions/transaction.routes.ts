import { Router } from 'express';
import TransactionController from './transaction.controller';

const transactionRouter = Router();

transactionRouter.post('/', TransactionController.addTransaction);
transactionRouter.get('/', TransactionController.fetchTransaction);
transactionRouter.delete('/', TransactionController.deleteTransaction);
transactionRouter.get('/month', TransactionController.fetchTransactionsForMonth);
transactionRouter.get('/category', TransactionController.getTransactionsCategory);
transactionRouter.get('/categories', TransactionController.fetchCategories);


export default transactionRouter;