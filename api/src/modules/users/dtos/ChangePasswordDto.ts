import { IsNotEmpty, IsString } from "class-validator";

export class ChangePasswordDTO {

    @IsNotEmpty({ message: 'El campo -- es requere'})
    @IsString()
    oldPassword: string;

    @IsNotEmpty()
    @IsString()
    @IsString()
    newPassword: string;

    @IsNotEmpty()
    @IsString()
    confirmPassword: string;
}