import { IsNotEmpty, IsOptional, Validate } from "class-validator";
import { UniqueUserValidator } from "../decorators/IsUniqueUser.decorator";

export class UserCreateDto {
    @IsNotEmpty({ message: 'El campo -username- es requerido' })
    @Validate(UniqueUserValidator, ['username'], { message: 'Ya existe un usuario con el -username- utilizado', })
    username: string;
    
    @IsNotEmpty({ message: 'El campo -password- es requerido' })
    password: string;
    
    @IsNotEmpty({ message: 'El campo -email- es requerido' })
    @Validate(UniqueUserValidator, ['email'], { message: 'Ya existe un usuario con el -email- utilizado', })
    email: string;
    
    @IsOptional()
    observations: string;
}