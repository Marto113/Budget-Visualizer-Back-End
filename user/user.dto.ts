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
    income: number;
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