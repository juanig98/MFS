
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from 'src/config/jwt';
import { UsersService } from 'src/modules/users/users.service';
import { JwtUserPayload } from './JwtUserPayload';
import { User } from 'src/models/entities/User.entity';

@Injectable()
export class JwtCiudadanoStrategy extends PassportStrategy(Strategy, 'jwtCiudadano') {
    constructor(
        private service: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: JwtUserPayload): Promise<User> {
        return await this.service.findById(payload.id);
    }
}