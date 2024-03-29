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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_service_1 = __importDefault(require("./transaction.service"));
class TransactionController {
    static addTransaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, category, name, description, price, date } = req.body;
            try {
                const response = yield transaction_service_1.default.addTransaction(userId, category, price, name, description);
                res.status(200).json(response);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    static fetchTransaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.body;
            try {
                const response = yield transaction_service_1.default.fetchTransactions(userId);
                res.status(200).json(response);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    static deleteTransaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            try {
                const response = yield transaction_service_1.default.deleteTransaction(id);
                res.status(200).json(response);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    static fetchTransactionsForMonth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, month } = req.body;
            try {
                const response = yield transaction_service_1.default.fetchTransactionsForMonth(userId, month);
                res.status(200).json(response);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
}
exports.default = TransactionController;
