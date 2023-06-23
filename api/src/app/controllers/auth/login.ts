import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { server } from "../../config/server";
import { IsNotEmpty, ValidationError, validateOrReject } from "class-validator";

export class LoginValidator {
    @IsNotEmpty({ message: 'El campo -username- no puede ser nulo' })
    username: string;
    @IsNotEmpty({ message: 'El campo -password- no puede ser nulo' })
    password: string;
}

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const loginValidator = new LoginValidator();
        loginValidator.username = req.body.username;
        loginValidator.password = req.body.password;
        // const err = await validate(loginValidator);
        await validateOrReject(loginValidator)



        //TODO: Verificar las credenciales del usuario en base de datos
        const validCredentials = true;

        if (validCredentials) {
            const user = { username: loginValidator.username };
            const token = jwt.sign(user, server.secretKey);
            res.json({ token });
        } else {
            res.sendStatus(401);
        }
    } catch (err) {


        if (Array.isArray(err) && err[0] instanceof ValidationError) {
            res.status(400).send(err.map(r => r));
            return;
        }
        // console.log(err);
        res.sendStatus(500);
    }
}

export default login;