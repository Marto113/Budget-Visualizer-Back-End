import { Request, Response, response } from "express";
import UserService from './user.service';
import { SetUserBalanceRequest, SetUserBalanceResponse, ErrorResponse, UpdateUserBalanceRequest, UpdateUserBalanceResponse, GetUserBalanceResponse, GetUserBalanceRequest } from './user.dto';
import { Balance } from "@prisma/client";


class UserController {
    static async getUserBalance(req: Request<{}, {}, GetUserBalanceRequest>, res: Response) {
        const { userId } = req.body;

        try {
            const balance = await UserService.getUserBalance(userId);
            if (balance) {
                const response: GetUserBalanceResponse = {
                    id: balance.id,
                    userId: balance.userId,
                    savings: balance.savings,
                    income: balance.income,
                    budget: balance.budget,
                };
                res.status(200).json(response);
            } else {
                res.status(404).json({ error: 'Balance not found' } as ErrorResponse);
            }
        } catch (error: any) {
            const errorResponse: ErrorResponse = { error: error.message };
            res.status(500).json(errorResponse);
        }
    }

    static async setUserBalance(req: Request<{}, {}, SetUserBalanceRequest>, res: Response) {
        const { userId, savings, income, budget } = req.body;

        try {
            const response: Balance | null = await UserService.setUserBalance(userId, savings, income, budget);
            if (response) {
                const result: SetUserBalanceResponse = {
                    id: response.id,
                    userId: response.userId,
                    savings: response.savings,
                    income: response.income,
                    budget: response.budget,
                };
                res.status(200).json(result);
            } else {
                res.status(500).json({ error: 'Error setting financial data' });
            }
        } catch (error: any) {
            const errorResponse: ErrorResponse = { error: error.message };
            res.status(500).json(errorResponse);
        }
    }

    static async updateUserBalance(req: Request<{}, {}, UpdateUserBalanceRequest>, res: Response) {
        const { userId, savings, income, budget } = req.body;

        try {
            const response: UpdateUserBalanceResponse = await UserService.updateUserBalance(userId, savings, income, budget);
            res.status(200).json(response);
        } catch (error: any) {
            const errorResponse: ErrorResponse = { error: error.message };
            if (error.message === 'User balance not found') {
                res.status(404).json(errorResponse);
            } else {
                res.status(500).json(errorResponse);
            }
        }
    }
}

export default UserController;