import { TransactionCategory } from "@prisma/client";

export interface AddTransactionRequest {
    userId: number;
    category: TransactionCategory;
    name?: string;
    description?: string;
    price: number;
    date: Date;
}

export interface AddTransactionResponse {
    id: number;
    userId: number;
    category: TransactionCategory;
    name?: string;
    description?: string;
    price: number;
}

export interface FetchTransactionRequest {
    userId: number;
}

export interface FetchTransactionsResponse {
    transactions: Transaction[];
}

export interface DeleteTransactionResponse {
    success: boolean;
}

export interface FetchTransactionsForMonthRequest {
    userId: number;
    month: number;
}

export interface FetchTransactionsForMonthResponse {
    transactions: Transaction[];
}

export interface GetTransactionsCategoryRequest {
    userId: number;
    month: number;
}

export interface GetTransactionsCategoryResponse {
    categories: { category: string; amount: number }[];
}

export interface FetchCategoriesRequest {
    userId: number;
    month: number;
    year: number;
    category: TransactionCategory;
}

export interface FetchCategoriesResponse {
    transactions: CategoryTransaction[];
}

export interface ErrorResponse {
    error: string;
}

export interface Transaction {
    id: number;
    category: TransactionCategory;
    price: number;
    date: Date;
}

export interface CategoryTransaction {
    category: TransactionCategory;
    price: number;
    date: Date;
}
