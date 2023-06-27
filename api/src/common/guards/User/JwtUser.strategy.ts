
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from 'src/config/jwt';
import { UsersService } from 'src/modules/users/users.service';
import { JwtUserPayload } from './JwtUserPayload';
import { User } from 'src/models/entities/User.entity';

@Injectable()
export class JwtUserStrategy extends PassportStrategy(Strategy, 'jwtUser') {
    constructor(
        private usersService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: JwtUserPayload): Promise<User> {
        const user = await this.usersService.findById(payload.id);

        if (!user) throw new UnauthorizedException();

        return user;
    }
}