"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class BalanceService {
    static addBalance(userId, income, budget, savings) {
        return __awaiter(this, void 0, void 0, function* () {
            const balance = yield prisma.balance.create({
                data: {
                    savings: savings,
                    income: income,
                    budget: budget,
                    userId: userId
                }
            });
            return { balance };
        });
    }
    static getBalance(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userBalanceData = yield prisma.user.findUnique({
                where: { id: userId },
                include: {
                    balances: true,
                },
            });
            return userBalanceData === null || userBalanceData === void 0 ? void 0 : userBalanceData.balances;
        });
    }
    static updateIncome(userId, newIncome) {
        return __awaiter(this, void 0, void 0, function* () {
            const userBalance = yield prisma.balance.findFirst({
                where: { userId: userId },
            });
            yield prisma.balance.update({
                where: { id: userBalance === null || userBalance === void 0 ? void 0 : userBalance.id },
                data: { income: newIncome },
                select: { income: true },
            });
        });
    }
    static updateBudget(userId, newBudget) {
        return __awaiter(this, void 0, void 0, function* () {
            const userBalance = yield prisma.balance.findFirst({
                where: { userId: userId },
            });
            yield prisma.balance.update({
                where: { id: userBalance === null || userBalance === void 0 ? void 0 : userBalance.id },
                data: { income: newBudget },
                select: { income: true },
            });
        });
    }
    static updateSavings(userId, newSavings) {
        return __awaiter(this, void 0, void 0, function* () {
            const userBalance = yield prisma.balance.findFirst({
                where: { userId: userId },
            });
            yield prisma.balance.update({
                where: { id: userBalance === null || userBalance === void 0 ? void 0 : userBalance.id },
                data: { income: newSavings },
                select: { income: true },
            });
        });
    }
}
