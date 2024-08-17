import { ErrorResponseType } from "../enums/request-response.enum";

export interface TokenResponse {
    user_id: number;
    token: string;
}
  
export interface RelationalOperators {
    eq?: string | number;
    neq?: string | number;
    gt?: string | number;
    gte?: string | number;
    lt?: string | number;
    lte?: string | number;
}
  
export interface RequestFilter {
    user_id?: RelationalOperators;
    status?: RelationalOperators;
}

export interface ErrorResponse {
    error_type: ErrorResponseType,
    message: string
}