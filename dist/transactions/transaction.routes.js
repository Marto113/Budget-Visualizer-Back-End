"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transaction_controller_1 = __importDefault(require("./transaction.controller"));
const transactionRouter = (0, express_1.Router)();
transactionRouter.post('/transactions', transaction_controller_1.default.addTransaction);
transactionRouter.get('/transactions', transaction_controller_1.default.fetchTransaction);
transactionRouter.delete('/transactions', transaction_controller_1.default.deleteTransaction);
transactionRouter.get('/transactions/month', transaction_controller_1.default.fetchTransactionsForMonth);
exports.default = transactionRouter;
