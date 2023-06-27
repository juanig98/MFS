import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/entities/User.entity';
import { UsersController } from './users.controller';
import { UniqueUserValidator } from './decorators/IsUniqueUser.decorator';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User
    ])
  ],
  providers: [
    UsersService,
    UniqueUserValidator
  ],
  exports: [
    UsersService
  ],
  controllers: [
    UsersController
  ]
})
export class UsersModule { }
