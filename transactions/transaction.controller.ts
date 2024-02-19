import { Request, Response } from "express";
import TransactionService from "./transaction.service";
import { TransactionCategory } from "@prisma/client";

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
        const id : number = +(req.query.id as string);

        try {
            const response = await TransactionService.deleteTransaction(id);
            res.status(200).json(response);
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    }

    static async fetchTransactionsForMonth(req: Request, res: Response) {
        const userId : number = +(req.query.userId as string);
        const month : number = +(req.query.month as string);
        
        try  {
            const response = await TransactionService.fetchTransactionsForMonth(userId, month);
            res.status(200).json(response);
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    }

    static async getTransactionsCategory(req: Request, res: Response){
        const userId : number = +(req.query.userId as string);
        const month : number = +(req.query.month as string);
        
        try  {
            const response = await TransactionService.getTransactionsCategory(userId, month);
            res.status(200).json(response);
        } catch (error: any) {
            res.status(500).json({error: error.message});
        }
    }

    static async fetchCategories(req: Request, res: Response){
        const userId : number = +(req.query.userId as string);
        const month : number = +(req.query.month as string);
        const year: number = parseInt(req.query.year as string, 10);
        const categoryString: string = req.query.category as string;
        const category: TransactionCategory = TransactionCategory[categoryString as keyof typeof TransactionCategory];

        try {
            const response = await TransactionService.fetchCategories(userId, month, year, category);
            res.status(200).json(response);
        } catch ( error: any ){
            console.log('error');
            res.status(500).json({error: error.message});
        }
    }
}

export default TransactionController;