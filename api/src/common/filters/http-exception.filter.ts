/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { isTestOrDevEnvironment } from 'src/config/configuration';


@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    readonly DIR_ERRORS = __dirname.substring(0, __dirname.search("dist/")).concat('/tmp/errors');
    readonly PAGE_404 = __dirname.substring(0, __dirname.search("dist/")).concat('/public/404.html');

    async catch(exception: HttpException, host: ArgumentsHost): Promise<void> {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const dataOriginal = exception.getResponse();
        // const user = <UsuarioCiudadano>(<any>request).user;
        const data = { statusCode: status, error: 'Ocurrió un error al procesar su solicitud', message: 'Ocurrió un error desconocido' }

        if (isTestOrDevEnvironment)
            console.error(JSON.stringify(dataOriginal))

        if ([401, 402, 403, 404].includes(status)) {
            response.status(404).sendFile(this.PAGE_404);
            return;
        } else if (status <= 599) {
            const message = (<any>exception.getResponse()).message;

            if (message.substring(0, 3) === '***') {
                data.message = message.substring(3, message.length);
                response.status(status).json(data);
                return;
            }

           
            response.status(status).json(data)
            return;
        }
        response.status(status).json(dataOriginal);
    }
} 