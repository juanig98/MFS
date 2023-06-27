import { Injectable } from '@nestjs/common';
import { StatusResultResponse } from 'src/models/interfaces/StatusResultResponse';

@Injectable()
export class AuthService {

    constructor(
        private userService
    ) { }

    async validar(
        username: string,
        password: string,
    ): Promise<StatusResultResponse<string>> {
        if (!username || !password)
            return { statusCode: 400, continue: false, result: 'Credenciales inválidas', };

        // let usuario = await this.usuarioService.buscarPorCuitActivo(username);
        // if (!usuario) {
        //     usuario = await this.usuarioService.buscarPorCuit(username);
        //     if (usuario) {
        //         return { statusCode: 400, continue: false, result: 'El usuario no está activo', };
        //     } else {
        //         return { statusCode: 400, continue: false, result: 'El usuario no existe en la base de datos', };
        //     }
        // } else {
        //     if (await this.usuarioService.validarContrasenia(usuario, password)) {
        //         return { statusCode: 200, continue: true, result: '' };
        //     } else {
        //         return { statusCode: 400, continue: false, result: 'Contraseña incorrecta', };
        //     }
        // }
    }
}