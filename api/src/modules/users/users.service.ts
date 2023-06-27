import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/entities/User.entity';
import { StatusEnum } from 'src/models/enums/Status.enum';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private repository: Repository<User>
    ) { }

    async findById(id: number): Promise<User> {
        return await this.repository.findOneBy({ id, status: StatusEnum.ACTIVE });
    }
}
