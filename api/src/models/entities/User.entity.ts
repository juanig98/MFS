import { Exclude, instanceToPlain } from 'class-transformer';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { StatusEnum } from '../enums/Status.enum';

@Entity({ name: 'users' })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, type: 'varchar' })
    username: string;

    @Column({ length: 100, type: 'varchar' })
    @Exclude({ toPlainOnly: true })
    password: string;

    @Column({ length: 150, type: 'varchar', unique: true })
    email: string;

    @Column({ length: 800, type: 'varchar', nullable: true })
    @Exclude({ toPlainOnly: true })
    observations: string;

    @Column({ type: 'enum', enum: StatusEnum, default: StatusEnum.ACTIVE })
    @Exclude({ toPlainOnly: true })
    status: StatusEnum;

    toJSON(): Partial<User> {
        return instanceToPlain(this);
    }

    toValidate(): Partial<User> {
        return { id: this.id };
    }
}
