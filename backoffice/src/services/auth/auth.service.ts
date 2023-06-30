import clientApi from "../clientApi";
import { CredentialsDto, LoginDto, LoginResponseDto } from "./auth.types";


export class AuthService {
    login = async (credentials: CredentialsDto): Promise<LoginResponseDto> => {
        const response = await clientApi.post<LoginDto>(`/auth`, credentials);
        const date = new Date();
        date.setHours(24);
        document.cookie = `token=${response.data.token};domain=localhost;path=/;expires=${date.toUTCString()};`

        return { authenticated: !!response.data.token, error: Array.isArray(response.data) ? response.data : ['No se pudo iniciar sesión'] }
    };
    validate = async (token: string) => {
        
        return await clientApi.post(`/auth/validate`, {}, {headers: {Authorization: `Bearer ${token}`}});
    };
}