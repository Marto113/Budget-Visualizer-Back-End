import { Request, Response } from "express";
import TransactionService from "./transaction.service";

class TransactionController {
    static async addTransaction(req: Request, res: Response) {
        const { userId, category, name, description, price, date } = req.body;

        try {
            const response = await TransactionService.addTransaction(category, name, description, price, userId, date);
            res.status(200).json(response);
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    }
}

export default TransactionController;