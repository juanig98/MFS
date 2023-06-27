import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';

async function register(req: Request, res: Response) {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        //TODO: Registrar en base de datos
        
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export default register;