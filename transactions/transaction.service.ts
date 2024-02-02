import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class TransactionService {
    static async addTransaction(
        category: ,
        name: string,
        description: string,
        price: number,
        userId: number,
        date: Date
    ){  
        const transaction = await prisma.transaction.create({
            data: {
                category,
                name,
                description,
                price,   
                userId,
                date
            }
        })

        return { transaction };
    }
}

export default TransactionService;