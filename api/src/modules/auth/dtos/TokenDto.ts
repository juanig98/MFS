import { IsNotEmpty, IsString } from "class-validator";

export class TokenDto {
    @IsNotEmpty({ message: 'El campo -token- es requerido' })
    @IsString()
    token: string;
}
