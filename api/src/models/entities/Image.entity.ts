import { Exclude, instanceToPlain } from 'class-transformer';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { StatusEnum } from '../enums/Status.enum';

@Entity({ name: 'images' })
export class Image extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, type: 'varchar' })
    filename: string;

    @Column({ length: 5, type: 'char' })
    type: string;

    @Column({ length: 50, type: 'varchar' })
    description: string;

    @Column({ length: 300, type: 'varchar' })
    path: string;

    @Column({ type: 'enum', enum: StatusEnum, default: StatusEnum.ACTIVE })
    @Exclude({ toPlainOnly: true })
    status: StatusEnum;

    toJSON(): Partial<Image> {
        return instanceToPlain(this);
    }
}