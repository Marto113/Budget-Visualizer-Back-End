import { Request, Response } from "express";
import UserService from './user.service';
import { SetUserBalanceRequest, SetUserBalanceResponse, ErrorResponse, UpdateUserBalanceRequest, UpdateUserBalanceResponse, GetUserBalanceResponse, GetUserBalanceRequest } from './user.dto';

interface ErrorWithMessage {
    message: string;
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
    return typeof error === 'object' && error !== null && 'message' in error && typeof (error as any).message === 'string';
}

class UserController {
    static async getUserBalance(req: Request<{}, {}, GetUserBalanceRequest>, res: Response) {
        const userId = parseInt(req.query.userId as string, 10);

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
        } catch (error: unknown) {
            if (isErrorWithMessage(error)) {
                const errorResponse: ErrorResponse = { error: error.message };
                res.status(500).json(errorResponse);
            } else {
                res.status(500).json({ error: 'An unknown error occurred' } as ErrorResponse);
            }
        }
    }

    static async setUserBalance(req: Request<{}, {}, SetUserBalanceRequest>, res: Response) {
        const { userId, savings, income, budget } = req.body;

        try {
            const balance = await UserService.setUserBalance(userId, savings, income, budget);
            if (balance) {
                const result: SetUserBalanceResponse = {
                    id: balance.id,
                    userId: balance.userId,
                    savings: balance.savings,
                    income: balance.income,
                    budget: balance.budget,
                };
                res.status(200).json(result);
            } else {
                res.status(500).json({ error: 'Error setting financial data' } as ErrorResponse);
            }
        } catch (error: unknown) {
            if (isErrorWithMessage(error)) {
                const errorResponse: ErrorResponse = { error: error.message };
                res.status(500).json(errorResponse);
            } else {
                res.status(500).json({ error: 'An unknown error occurred' } as ErrorResponse);
            }
        }
    }

    static async updateUserBalance(req: Request<{}, {}, UpdateUserBalanceRequest>, res: Response) {
        const { userId, savings, income, budget } = req.body;

        try {
            const updatedBalance = await UserService.updateUserBalance(userId, savings, income, budget);
            if (updatedBalance) {
                res.status(200).json(updatedBalance);
            } else {
                res.status(404).json({ error: 'User balance not found' } as ErrorResponse);
            }
        } catch (error: unknown) {
            if (isErrorWithMessage(error)) {
                const errorResponse: ErrorResponse = { error: error.message };
                res.status(500).json(errorResponse);
            } else {
                res.status(500).json({ error: 'An unknown error occurred' } as ErrorResponse);
            }
        }
    }
}

export default UserController;
