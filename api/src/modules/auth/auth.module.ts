import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/config/jwt';
import { JwtUserStrategy } from 'src/common/guards/User/JwtUser.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule, 

    JwtModule.register({ secret: jwtConstants.secret, signOptions: { expiresIn: '360m' } }),
  ],
  controllers: [
    AuthController
  ],
  providers: [
    AuthService, 
    JwtUserStrategy
  ]
})
export class AuthModule { }
