"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("./user.controller"));
const ruserRouter = (0, express_1.Router)();
ruserRouter.post('/user/register', user_controller_1.default.register);
// ruserRouter.get('/user/{id}', UserController.getUserById);
// ruserRouter.patch('/user/update-user', UserController.updateUser);
// ruserRouter.delete('/user/delete/{id}', UserController.deleteUser);
exports.default = ruserRouter;
