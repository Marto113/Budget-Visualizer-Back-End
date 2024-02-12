"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./auth/auth.routes"));
const user_routes_1 = __importDefault(require("./user/user.routes"));
const transaction_routes_1 = __importDefault(require("./transactions/transaction.routes"));
// import transactionRouter from './transactions/transaction.routes';
const cookieParser = require('cookie-parser');
const cors = require('cors');
const credentials = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
};
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(cookieParser());
app.use(cors(credentials));
app.use(express_1.default.json());
app.post('/auth/login', auth_routes_1.default);
app.post('/auth/refresh-token', auth_routes_1.default);
app.post('/user/register', user_routes_1.default);
app.get('/user/balance', user_routes_1.default);
app.post('/user/balance', user_routes_1.default);
app.post('/transactions', transaction_routes_1.default);
app.delete('/transactions', transaction_routes_1.default);
app.get('/transactions', transaction_routes_1.default);
app.get('/transactions/month', transaction_routes_1.default);
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server: http://localhost:${port}`);
});
