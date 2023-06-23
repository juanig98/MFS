

import { Request, Response } from "express";

const create = async (req: Request, res: Response) => {
    try {
        console.log(req.body);

        res.status(201).send({ result: 'Producto creado existosamente!' });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export default create;