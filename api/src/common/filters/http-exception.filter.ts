/* eslint-disable no-console */
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { User } from 'src/models/entities/User.entity';

// interface ExceptionResponse {
//     statusCode: number;
//     error: string;
//     message: string | string[]
// }

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();

        const request = ctx.getRequest<Request>();
        const user = <User>(<Request & { user: User }>request).user;

        if (status <= 400 && status >= 499) {
            console.error(`${new Date()}: [User: ${user.username} (${user.id})] ${exception.getResponse()}`)
        }
        
        if (exception.message.startsWith('***')) {
            exception.message = exception.message.substring(3, exception.message.length)
        }

        response.status(status).json({
            statusCode: status,
            message: exception.message,
        });
    }
    // readonly DIR_ERRORS = __dirname.substring(0, __dirname.search("dist/")).concat('/tmp/errors');
    // readonly PAGE_404 = __dirname.substring(0, __dirname.search("dist/")).concat('/public/404.html');
    // async catch(exception: HttpException, host: ArgumentsHost): Promise<void> {
    //     const ctx = host.switchToHttp();
    //     const response = ctx.getResponse<Response>();
    //     const request = ctx.getRequest<Request>();
    //     const status = exception.getStatus();
    //     const dataOriginal = exception.getResponse();
    //     const user = <User>(<Request & { user: User }>request).user;
    //     const data: ExceptionResponse = { statusCode: status, error: 'Ocurrió un error al procesar su solicitud', message: 'Ocurrió un error desconocido' }

    //     if (isTestOrDevEnvironment)
    //         console.error(JSON.stringify(dataOriginal))

    //     if ([400, 401].includes(status)) {
    //         const message = (<any>exception.getResponse()).message;
    //         data.error = status === 401 ? "Unauthorized" : "Bad request"

    //         if (message) {
    //             if (Array.isArray(message)) {
    //                 data.message = message;
    //                 response.status(status).json(data);
    //                 return;
    //             }

    //             if (typeof message === 'string' && message.substring(0, 3) === '***') {
    //                 data.message = message.substring(3, message.length);
    //                 response.status(status).json(data);
    //                 return;
    //             }
    //             response.status(400).json(message);
    //             return;
    //         }
    //     }

    //     if ([402, 403, 404].includes(status)) {
    //         response.status(404).sendFile(this.PAGE_404);
    //         return;
    //     }

    //     if (status <= 599) {
    //         console.log(exception.getResponse())
    //         const message = (<any>exception.getResponse()).message;

    //         if (message && message.substring(0, 3) === '***') {
    //             data.message = message.substring(3, message.length);
    //             response.status(status).json(data);
    //             return;
    //         }

    //         response.status(status).json(data)
    //         return;
    //     }
    //     response.status(status).json(dataOriginal);
    // }
} 