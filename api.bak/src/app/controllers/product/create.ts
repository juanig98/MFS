

import { IsNotEmpty, IsNumber, IsOptional, MaxLength } from "class-validator";
import { Request, Response } from "express";

export class ProductCreateDto {
    @IsNotEmpty({ message: 'El campo -title- no puede ser nulo' })
    @MaxLength(100, { message: 'El campo -title- es demasiado largo (máximo 100 caracteres)' })
    title: string;

    @IsNotEmpty({ message: 'El campo -description- no puede ser nulo' })
    @MaxLength(512, { message: 'El campo -title- es demasiado largo (máximo 512 caracteres)' })
    description: string;

    @IsNotEmpty({ message: 'El campo -price_cost- no puede ser nulo' })
    @IsNumber({ maxDecimalPlaces: 2 }, { message: 'El campo -price_cost- debe ser un número' })
    price_cost: number;

    @IsNotEmpty({ message: 'El campo -price_public- no puede ser nulo' })
    @IsNumber({ maxDecimalPlaces: 2 }, { message: 'El campo -price_public- debe ser un número' })
    price_public: number;

    @IsOptional()
    observations: string;
}

const create = async (req: Request, res: Response) => {
    try {
        const productCreateDto = new ProductCreateDto();
        productCreateDto.title = req.body.title;
        productCreateDto.description = req.body.description;
        productCreateDto.price_cost = req.body.price_cost;
        productCreateDto.price_public = req.body.price_public;
        productCreateDto.observations = req.body.observations;

        


        res.status(201).send({ result: 'Producto creado existosamente!' });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export default create;