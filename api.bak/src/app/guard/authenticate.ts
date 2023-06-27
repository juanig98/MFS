import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { server } from '../config/server';


function authenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, server.secretKey, (err: any, user: any) => {
        if (err) return res.sendStatus(404);
        req.body.user = user;
        next();
    });
}

export default authenticate;