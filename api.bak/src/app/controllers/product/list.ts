

import { Request, Response } from "express";

const list = async (req: Request, res: Response) => {
    try {
        console.log(req.body);

        res.send([
            { id: 1, description: "Producto 1" },
            { id: 2, description: "Producto 2" }
        ]);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export default list; 