import { Request, Response } from "express";
import TransactionService from "./transaction.service";
import {
    AddTransactionRequest, AddTransactionResponse, FetchTransactionRequest, FetchTransactionsResponse,
    DeleteTransactionResponse, FetchTransactionsForMonthRequest, FetchTransactionsForMonthResponse,
    GetTransactionsCategoryRequest, GetTransactionsCategoryResponse, FetchCategoriesRequest, FetchCategoriesResponse,
    ErrorResponse
} from './transaction.dto';
import { TransactionCategory } from "@prisma/client";

interface ErrorWithMessage {
    message: string;
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
    return typeof error === 'object' && error !== null && 'message' in error && typeof (error as any).message === 'string';
}

class TransactionController {
    static async addTransaction(req: Request<{}, {}, AddTransactionRequest>, res: Response<AddTransactionResponse | ErrorResponse>) {
        try {
            const response: AddTransactionResponse = await TransactionService.addTransaction(req.body);
            res.status(200).json(response);
        } catch (error: unknown) {
            if (isErrorWithMessage(error)) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }
    }

    static async fetchTransaction(req: Request<{}, {}, FetchTransactionRequest>, res: Response<FetchTransactionsResponse | ErrorResponse>) {
        try {
            const response: FetchTransactionsResponse = await TransactionService.fetchTransactions(req.body);
            res.status(200).json(response);
        } catch (error: unknown) {
            if (isErrorWithMessage(error)) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }
    }

    static async deleteTransaction(req: Request, res: Response<DeleteTransactionResponse | ErrorResponse>) {
        const id: number = +(req.query.id as string);

        try {
            const response: DeleteTransactionResponse = await TransactionService.deleteTransaction(id);
            res.status(200).json(response);
        } catch (error: unknown) {
            if (isErrorWithMessage(error)) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }
    }

    static async fetchTransactionsForMonth(req: Request, res: Response<FetchTransactionsForMonthResponse | ErrorResponse>) {
        const userId: number = +(req.query.userId as string);
        const month: number = +(req.query.month as string);

        try {
            const response: FetchTransactionsForMonthResponse = await TransactionService.fetchTransactionsForMonth({ userId, month });
            res.status(200).json(response);
        } catch (error: unknown) {
            if (isErrorWithMessage(error)) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }
    }

    static async getTransactionsCategory(req: Request, res: Response<GetTransactionsCategoryResponse | ErrorResponse>) {
        const userId: number = +(req.query.userId as string);
        const month: number = +(req.query.month as string);

        try {
            const response: GetTransactionsCategoryResponse = await TransactionService.getTransactionsCategory({ userId, month });
            res.status(200).json(response);
        } catch (error: unknown) {
            if (isErrorWithMessage(error)) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }
    }

    static async fetchCategories(req: Request, res: Response<FetchCategoriesResponse | ErrorResponse>) {
        const userId: number = +(req.query.userId as string);
        const month: number = +(req.query.month as string);
        const year: number = +(req.query.year as string);
        const category: TransactionCategory = req.query.category as TransactionCategory;

        try {
            const response: FetchCategoriesResponse = await TransactionService.fetchCategories({ userId, month, year, category });
            res.status(200).json(response);
        } catch (error: unknown) {
            if (isErrorWithMessage(error)) {
                res.status(500).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unknown error occurred' });
            }
        }
    }
}

export default TransactionController;
