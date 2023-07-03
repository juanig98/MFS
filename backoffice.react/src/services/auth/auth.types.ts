export interface CredentialsDto {
    username: string;
    password: string;
}
export interface LoginDto {
    token: string;
}
export interface TokenPayloadDto {
    id: number;
    iss: string;
    exp: number;
}
export interface LoginResponseDto {
    authenticated: boolean;
    error?: string[];
}