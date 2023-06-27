export interface StatusResultResponse<T> {
    statusCode: number;
    result?: T;
    continue?: boolean;
    error?: boolean;
}
