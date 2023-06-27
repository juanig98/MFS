import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from 'src/models/entities/User.entity';
import { TokenDto } from 'src/modules/auth/dtos/TokenDto';
import { JwtUserPayload } from 'src/common/guards/User/JwtUserPayload';
import { LoginDto } from 'src/modules/auth/dtos/LoginDto';
import { JwtService } from '@nestjs/jwt';

interface ValidateResult {
    valid: boolean;
    result?: string;
    user?: User,
}

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async validate(loginDto: LoginDto): Promise<ValidateResult> {
        const { username, password } = loginDto;

        const user = await this.usersService.findByUsername(username);

        if (!user) return { result: "***Usuario inválido", valid: false }

        if (process.env.ENVIRONMENT === 'local') return { user, result: "Usuario válido, entorno local/test activo", valid: true }

        const passValid = await this.usersService.checkPassword(user, password);

        if (!passValid) return { result: "***Contraseña incorrecta", valid: false }

        return { user, result: "Usuario válido", valid: true };
    }

    async generateToken(user: User): Promise<TokenDto> {
        const payload: JwtUserPayload = { id: user.id, username: user.username };
        return { token: this.jwtService.sign(payload, { issuer: 'mfs' }) };
    }
}