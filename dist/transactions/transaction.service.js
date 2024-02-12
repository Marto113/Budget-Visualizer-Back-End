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
class TransactionService {
    static addTransaction(userId, category, price, name, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const date = new Date();
            const transactionData = {
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
            const transaction = yield prisma.transaction.create({
                data: transactionData,
            });
            return { transaction };
        });
    }
    static fetchTransactions(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const transactions = yield prisma.transaction.findMany({
                where: { userId }
            });
            return { transactions };
        });
    }
    static deleteTransaction(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedTransaction = yield prisma.transaction.delete({
                where: { id }
            });
            return deletedTransaction;
        });
    }
    static fetchTransactionsForMonth(userId, month) {
        return __awaiter(this, void 0, void 0, function* () {
            const year = new Date().getFullYear();
            const transactions = yield prisma.transaction.findMany({
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
        });
    }
}
exports.default = TransactionService;
