import { IsNotEmpty, IsString } from "class-validator";

export class TokenDto {
    @IsNotEmpty({ message: 'El parametro token es requerido' })
    @IsString()
    token: string;
}
