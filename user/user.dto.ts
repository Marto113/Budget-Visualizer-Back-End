export interface RegisterResponse {
    success: boolean;
    message: string;
    userId?: string;
}

// update request / response
export interface UpdateUserBalanceRequest {
    userId: number;
    savings: number;
    income: number;
    budget: number;
}

export interface UpdateUserBalanceResponse {
    userId: number;
    savings: number;
    income: number;
    budget: number;
    message: string;
}

// set request / response
export interface SetUserBalanceRequest {
    userId: number;
    savings: number;
    income: number;
    budget: number;
}

export interface SetUserBalanceResponse {
    id: number;
    userId: number;
    savings: number;
    income: number;
    budget: number;
}

// get request / response
export interface GetUserBalanceRequest {
    userId: number;
}

export interface GetUserBalanceResponse {
    id: number;
    userId: number;
    savings: number;
    income: number;
    budget: number;
}

export interface ErrorResponse {
    error: string;
}

export function isErrorWithMessage(error: unknown): error is ErrorResponse {
    return typeof error === 'object' && error !== null && 'message' in error && typeof (error as any).error === 'string';
}