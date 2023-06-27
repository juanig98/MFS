import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @IsNotEmpty({ message: 'El campo -username- es requerido' })
    @IsString()
    username: string;
    
    @IsNotEmpty({ message: 'El campo -password- es requerido' })
    @IsString()
    password: string;
}
