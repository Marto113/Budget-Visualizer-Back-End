import { Prisma, PrismaClient, Balance } from "@prisma/client";

const prisma = new PrismaClient();

class BalanceService {
    static async addBalance(userId: number, savings: number, income: number, budget: number) {
        try {
            const balance = await prisma.balance.create({
                data: {
                    savings: savings,
                    income: income,
                    budget: budget,
                    userId: userId
                }
            });
    
            console.log("New balance created:", balance); // Log the new balance object
    
            return { balance };
        } catch (error) {
            console.error("Error in addBalance:", error);
            throw error; // Re-throw the error to handle it at a higher level
        }
    }
    
    static async getBalance(userId: number) {
        const balance = await prisma.balance.findMany({
            where: { userId }
        });

        return { balance };
    }

    static async updateBalance(userId: number, savings: number, income: number, budget: number){
        const userBalance = await prisma.balance.findFirst({
            where: { userId: userId },
        });

        await prisma.balance.update({
            where: { id: userBalance?.id},
            data: { savings: savings, income: income, budget: budget } as Partial<Balance>,
            select: { income: true },
        });
    }

}

export default BalanceService