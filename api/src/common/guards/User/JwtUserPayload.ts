export interface JwtUserPayload {
    id: number;
    username: string;
    iss?: string;
    iat?: number;
    exp?: number;
}