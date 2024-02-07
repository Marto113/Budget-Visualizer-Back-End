import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class TransactionService {
    static async addTransaction(
        userId: number,
        category: 'Entertainment' | 'Groceries' | 'Bills' | 'Transportation' | 
        'Utilities' | 'Food' | 'Health' | 'Clothing' | 'Travel' | 'Miscellaneous',
        price: number,
        name?: string,
        description?: string,
    ){  
        const date = new Date();

        const transactionData: {
            userId: number;
            category: typeof category;
            price: number;
            date: Date;
            name?: string;
            description?: string;
        } = {
            userId,
            category,
            price,   
            date,
        };

        if (name !== undefined) {
            transactionData.name = name;
        }

        if (description !== undefined) {
            transactionData.description = description;
        }

        const transaction = await prisma.transaction.create({
            data: transactionData,
        });

        return { transaction };
    }

    static async fetchTransactions(userId: number) {
        const  transactions = await prisma.transaction.findMany({
            where: { userId }
        });

        return { transactions };
    }

    static async deleteTransaction(id: number) {
        const deletedTransaction = await prisma.transaction.delete({
            where: { id }
        });

        return  deletedTransaction;
    }

    static async fetchTransactionsForMonth(userId: number, month: number) {
        const year = new Date().getFullYear();

        const transactions = await prisma.transaction.findMany({
            where: {
                userId,
                AND: [
                    { date: { gte: new Date(year, month - 1, 1) } },
                    { date: { lt: new Date(year, month, 1) } },
                ],
            },
            select: {
                id: true,
                category: true,
                price: true,
                date: true
            },
        });

        return { transactions };
    }
}

export default TransactionService;