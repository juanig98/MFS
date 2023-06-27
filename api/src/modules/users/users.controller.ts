import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/models/entities/User.entity';
import { UserCreateDto } from './dtos/UserCreateDto';

@Controller('users')
export class UsersController {

    constructor(
        private service: UsersService
    ) { }

    @Post('register')
    async register(@Body() userCreateDto: UserCreateDto): Promise<User> {
        return await this.service.create(userCreateDto);
    }
}
