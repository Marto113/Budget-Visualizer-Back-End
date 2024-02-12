import { Router } from "express";
import BalanceController from './balance.controller';

const balanceRouter = Router();

balanceRouter.post('/balance', BalanceController.addBalance);
balanceRouter.get('/balance', BalanceController.getBalance);
balanceRouter.post('/balance/edit', BalanceController.updateBalance);


export default balanceRouter;