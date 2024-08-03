export interface TokenResponse {
    token_type: string;
    access_token: string;
    refresh_token: string;
    expires_in: number;
    expires_at: number;
    user_id: number;
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
    user_id: RelationalOperators;
}