export interface JwtUserPayload {
    id: number;
    iss: string;
    iat: Date;
    exp: Date;
}