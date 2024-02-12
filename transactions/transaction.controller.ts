import { Request, Response } from "express";
import TransactionService from "./transaction.service";

class TransactionController {
    static async addTransaction(req: Request, res: Response) {
        const { userId, category, name, description, price, date } = req.body;

        try {
            const response = await TransactionService.addTransaction(userId, category, price, name, description);
            res.status(200).json(response);
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    }

    static async fetchTransaction(req: Request, res: Response) {
        const { userId } = req.body;

        try {
            const response = await TransactionService.fetchTransactions(userId);
            res.status(200).json(response);
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    }

    static async deleteTransaction(req: Request, res: Response) {
        const { id } = req.body;

        try {
            const response = await TransactionService.deleteTransaction(id);
            res.status(200).json(response);
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    }

    static async fetchTransactionsForMonth(req: Request, res: Response) {
        const { userId, month } = req.body;

        try  {
            const response = await TransactionService.fetchTransactionsForMonth(userId, month);
            res.status(200).json(response);
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    }

    static async fetchTransactionFotMonthByWeek(req: Request, res: Response) {
        const { userId, month } = req.body;

        try {
            const response = await TransactionService.fetchTransactionFotMonthByWeek(userId, month);
            res.status(200).json(response);
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    }
}

export default TransactionController;