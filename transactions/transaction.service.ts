import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class TransactionService {
    static async addTransaction(
        category: string,
        name: string,
        description: string,
        price: number,
        userId: number,
    ){
        const transaction = await prisma.transaction.create({
            data: {
                category,
                name,
                description,
                price,   
                userId
            }
        })
    }
}