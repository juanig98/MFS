

import { Request, Response } from "express";

const test1 = async (req: Request, res: Response) => {
    try {
        console.log(req.body);

        res.sendStatus(201).send({ result: 'Producto creado existosamente!' });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export default test1;