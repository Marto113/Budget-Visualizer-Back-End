import { Balance, PrismaClient } from '@prisma/client';
import AuthService from '../auth/auth.service';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

class UserService {
    static async register(username: string, password: string): Promise<any> {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword
            },
        });

        const accessToken = UserService.generateAccessToken(user.id);
        const refreshToken = UserService.generateRefreshToken(user.id);
        
        return { user, accessToken, refreshToken };
    }

    private static generateAccessToken(userId: number): string {
        const accessToken = jwt.sign({ userId }, process.env.ACCESS_SECRET as string, { expiresIn: '15m' });
        return accessToken;
    }

    private static generateRefreshToken(userId: number): string {
        const refreshToken = jwt.sign({ userId }, process.env.REFRESH_SECRET as string, { expiresIn: '7d' });
        return refreshToken;
    }

    static async getUserBalance(userId: number): Promise<Balance | null> {
        try {
            const userWithBalance = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
                include: {
                    balances: true,
                },
            });

            if (userWithBalance) {
                return userWithBalance.balances[0] || null;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error fetching user balance:', error);
            return null;
        }
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
}


export default UserService;