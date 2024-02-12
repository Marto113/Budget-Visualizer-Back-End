import { Request, Response, response } from "express";
import BalanceService from './balance.service';

class BalanceController {
    static async addBalance(req: Request, res: Response) {
        const { userId, savings, income, budget} = req.body;
        
        try {
            const response = await BalanceService.addBalance(userId, savings, income, budget) ;
            res.status(200).json(response);
        } catch (error: any) {
            res.status(500).json(response);
        }
    }

    static async updateBalance(req: Request, res: Response) {
        const { userId, savings, income, budget} = req.body;

        try {
            const response = await BalanceService.updateBalance(userId, savings, income, budget) ;
            res.status(200).json(response);
        } catch (error: any) {
            res.status(500).json(response);
        }
    };

    static async getBalance(req: Request, res: Response) {
        const { userId } = req.body;

        try {
            const response = await BalanceService.getBalance(userId);
            res.status(200).json(response);
        } catch (error: any) {
            res.status(500).json(response);
        }
    }
}

export default BalanceController;