import { PrismaClient, TransactionCategory } from '@prisma/client';
import {
    AddTransactionRequest, AddTransactionResponse, FetchTransactionRequest, FetchTransactionsResponse,
    DeleteTransactionResponse, FetchTransactionsForMonthRequest, FetchTransactionsForMonthResponse,
    GetTransactionsCategoryRequest, GetTransactionsCategoryResponse, FetchCategoriesRequest, FetchCategoriesResponse,
    Transaction, CategoryTransaction
} from './transaction.dto';

const prisma = new PrismaClient();

class TransactionService {
    static async addTransaction({
        userId, category, name, description, price
    }: AddTransactionRequest): Promise<AddTransactionResponse> {
        const currentDate = new Date();

        const transaction = await prisma.transaction.create({
            data: {
                userId,
                category,
                name: name || undefined,
                description: description || undefined,
                price,
                date: currentDate
            },
        });
    
        return {
            id: transaction.id,
            userId: transaction.userId,
            category: transaction.category,
            name: transaction.name || undefined,
            description: transaction.description || undefined,
            price: transaction.price,
        };
    }
    

    static async fetchTransactions({ userId }: FetchTransactionRequest): Promise<FetchTransactionsResponse> {
        const transactions = await prisma.transaction.findMany({
            where: { userId },
            orderBy: { date: 'desc' },
        });

        return { transactions };
    }

    static async deleteTransaction(id: number): Promise<DeleteTransactionResponse> {
        await prisma.transaction.delete({
            where: { id },
        });

        return { success: true };
    }

    static async fetchTransactionsForMonth({
        userId, month
    }: FetchTransactionsForMonthRequest): Promise<FetchTransactionsForMonthResponse> {
        const year = new Date().getFullYear();
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        const transactions = await prisma.transaction.findMany({
            where: {
                userId,
                date: {
                    gte: startDate,
                    lt: endDate,
                },
            },
            orderBy: { date: 'desc' },
            select: {
                id: true,
                category: true,
                price: true,
                date: true,
            },
        });

        return { transactions };
    }

    static async getTransactionsCategory({
        userId, month
    }: GetTransactionsCategoryRequest): Promise<GetTransactionsCategoryResponse> {
        const year = new Date().getFullYear();
        const transactions = await prisma.transaction.findMany({
            where: {
                userId,
                date: {
                    gte: new Date(year, month - 1, 1),
                    lt: new Date(year, month, 0),
                },
            },
        });

        const categoryAmounts: Record<TransactionCategory, { amount: number }> = {
            Entertainment: { amount: 0 },
            Groceries: { amount: 0 },
            Bills: { amount: 0 },
            Transportation: { amount: 0 },
            Utilities: { amount: 0 },
            Food: { amount: 0 },
            Health: { amount: 0 },
            Clothing: { amount: 0 },
            Travel: { amount: 0 },
            Miscellaneous: { amount: 0 },
        };

        transactions.forEach(transaction => {
            const { category, price } = transaction;
            categoryAmounts[category].amount += price;
        });

        const categories = Object.entries(categoryAmounts)
            .filter(([_, { amount }]) => amount !== 0)
            .map(([category, { amount }]) => ({
                category,
                amount,
            }));

        return { categories };
    }

    static async fetchCategories({
        userId, month, year, category
    }: FetchCategoriesRequest): Promise<FetchCategoriesResponse> {
        const transactions = await prisma.transaction.findMany({
            where: {
                userId,
                date: {
                    gte: new Date(year, month - 1, 1),
                    lt: new Date(year, month, 0),
                },
                category,
            },
            select: {
                category: true,
                price: true,
                date: true,
            },
        });

        return { transactions };
    }
}

export default TransactionService;
