import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface, } from "class-validator";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/models/entities/User.entity";

@ValidatorConstraint({ name: "IsUniqueUser", async: true })
export class UniqueUserValidator implements ValidatorConstraintInterface {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async validate(value: any, args: ValidationArguments) {
        const filter = {};
        filter[args.property] = value; 
        const count = await this.userRepository.count({ where: filter }); 
        return !count;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    defaultMessage(args: ValidationArguments) {
        return `$(value) is already taken`;
    }
}
