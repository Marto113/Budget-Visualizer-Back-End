import { Prisma, PrismaClient, Balance } from "@prisma/client";

const prisma = new PrismaClient();

class BalanceService {
    static async addBalance(userId: number, income: number, budget: number, savings: number){
        const balance = await prisma.balance.create({
            data: {
                savings: savings,
                income: income,
                budget: budget,
                userId: userId
            }
        });

        return { balance };
    }

    static async getBalance(userId: number){
        const userBalanceData = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                balances: true,
            },
        });

        return userBalanceData?.balances;
    }

    static async updateIncome(userId: number, newIncome: number){
        const userBalance = await prisma.balance.findFirst({
            where: { userId: userId },
        });

        await prisma.balance.update({
            where: { id: userBalance?.id},
            data: { income: newIncome } as Partial<Balance>,
            select: { income: true },
        });
    }

    static async updateBudget(userId: number, newBudget: number){
        const userBalance = await prisma.balance.findFirst({
            where: { userId: userId },
        });

        await prisma.balance.update({
            where: { id: userBalance?.id},
            data: { income: newBudget } as Partial<Balance>,
            select: { income: true },
        });
    }
    
    static async updateSavings(userId: number, newSavings: number){
        const userBalance = await prisma.balance.findFirst({
            where: { userId: userId },
        });

        await prisma.balance.update({
            where: { id: userBalance?.id},
            data: { income: newSavings } as Partial<Balance>,
            select: { income: true },
        });
    }
}