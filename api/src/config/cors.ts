import { BadRequestException } from "@nestjs/common";

const whitelist: string[] =
    [
        'http://localhost',
        'http://localhost:4400',
        'http://localhost:8080',
    ];


export const cors = {
    active: true,
    options: {
        origin: (origin, callback) => (whitelist.indexOf(origin) !== -1 || !origin || origin === 'null') ? callback(null, true) : callback(new BadRequestException('Not allowed by CORS')),
        allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
        methods: "GET,PUT,POST,DELETE,UPDATE,OPTIONS",
        credentials: true,
    }
}