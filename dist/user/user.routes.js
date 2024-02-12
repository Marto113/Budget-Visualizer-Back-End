"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("./user.controller"));
const userRouter = (0, express_1.Router)();
userRouter.post('/user/register', user_controller_1.default.register);
userRouter.get('/user/balance', user_controller_1.default.getUserBalance);
userRouter.post('/user/balance', user_controller_1.default.setUserBalance);
// ruserRouter.patch('/user/update-user', UserController.updateUser);
// ruserRouter.delete('/user/delete/{id}', UserController.deleteUser);
exports.default = userRouter;
