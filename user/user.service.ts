import { Balance, PrismaClient } from '@prisma/client';
import { UpdateUserBalanceResponse } from './user.dto';

import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

class UserService {
    static async getUserBalance(userId: number): Promise<Balance | null> {
        const balance = await prisma.balance.findFirst({
            where: { userId: userId }
        });
        
        return balance;
    }

    static async setUserBalance(userId: number, savings: number, income: number, budget: number): Promise<Balance | null> {
        try {
            const existingBalance = await prisma.balance.findFirst({
                where: {
                    userId: userId
                },
            });

            if (existingBalance) {
                const updatedBalance = await prisma.balance.update({
                    where: {
                        id: existingBalance.id
                    },
                    data: {
                        savings,
                        income,
                        budget,
                    },
                });

                return updatedBalance;
            } else {
                const newBalance = await prisma.balance.create({
                    data: {
                        userId,
                        savings,
                        income,
                        budget,
                    },
                });

                return newBalance;
            }
        } catch (error) {
            console.error('Error setting financial data:', error);
            return null;
        }
    }

    static async updateUserBalance(userId: number, savings: number, income: number, budget: number): Promise<UpdateUserBalanceResponse> {
        const userBalance = await prisma.balance.findFirst({
            where: { userId: userId },
        });

        if (!userBalance) {
            throw new Error('User balance not found');
        }

        const updatedBalance = await prisma.balance.update({
            where: { id: userBalance.id },
            data: { savings, income, budget },
            select: { userId: true, savings: true, income: true, budget: true  },
        });

        return {
            userId: updatedBalance.userId,
            savings: updatedBalance.savings,
            income: updatedBalance.income,
            budget: updatedBalance.budget,
            message: 'Balance updated successfully'
        };
    }
}


export default UserService;