import { Exclude, instanceToPlain } from 'class-transformer';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { StatusEnum } from '../enums/Status.enum';
import { TextNumberEnum } from '../enums/TextNumber.enum';

@Entity({ name: 'sizes' })
export class Size extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, type: 'varchar' })
    title: string;

    @Column({ length: 100, type: 'varchar' })
    description: string;

    @Column({ length: 10, type: 'char', nullable: true })
    abbreviation: string;

    @Column({ type: 'enum', enum: TextNumberEnum, default: TextNumberEnum.NUMBER })
    type: string;

    @Column({ precision: 18, scale: 2, type: 'decimal', nullable: true })
    maximum: number;

    @Column({ precision: 18, scale: 2, type: 'decimal', nullable: true })
    minimum: number;

    @Column({ length: 10, type: 'char', nullable: true })
    suffix: string;

    @Column({ length: 10, type: 'char', nullable: true })
    prefix: string;

    @Column({ length: 800, type: 'varchar', nullable: true })
    observations: string;

    @Column({ type: 'enum', enum: StatusEnum, default: StatusEnum.ACTIVE })
    @Exclude({ toPlainOnly: true })
    status: StatusEnum;

    toJSON(): Partial<Size> {
        return instanceToPlain(this);
    }
}  