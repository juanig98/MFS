import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/entities/User.entity';
import { StatusEnum } from 'src/models/enums/Status.enum';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private repository: Repository<User>
    ) { }

    async findById(id: number): Promise<User> {
        return await this.repository.findOneBy({ id, status: StatusEnum.ACTIVE });
    }

    async findByUsername(username: string): Promise<User> {
        return await this.repository.findOne({ where: { username, status: StatusEnum.ACTIVE } });
    }

    async checkPassword(user: User, password: string): Promise<boolean> {
        return await bcrypt.compare(password, user.password)
    }

    async create(userPartial: Partial<User>): Promise<User> {
        const hashedPass = await bcrypt.hash(userPartial.password, 10)
        const user = this.repository.create({ ...userPartial, password: hashedPass })

        await this.repository.save(user);

        return user;
    }

    // async changePassword(changePasswordDTO: ChangePasswordDTO, user: User): Promise<StatusResultResponse<string>> {
    //     try {

    //         if (changePasswordDTO.newPassword != changePasswordDTO.confirmPassword) throw new Error("Las contraseña ingresada y su confirmación no coinciden")
    //         const equals = await this.checkPassword(user, changePasswordDTO.oldPassword);
    //         if (!equals) throw new Error("La contraseña anterior no coincide con nuestros registros");

    //         const hash = await bcrypt.hash(changePasswordDTO.newPassword, 10)
    //         user.password = hash;

    //         const result = await this.repository.save(user);

    //         if (!(result.password == hash)) throw new Error(`No se actualizó correctamente la contraseña`);

    //         return { statusCode: 200, continue: true, result: "Contraseña actualizada correctamente" };

    //     } catch (error) {
    //         console.error(error.message, `Usuario: ${user.username} (${user.id}). Data: `, JSON.stringify(changePasswordDTO));
    //         return { statusCode: 400, continue: false, result: error.message };
    //     }
    // }

}
