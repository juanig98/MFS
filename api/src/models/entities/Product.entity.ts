import { Exclude, instanceToPlain } from 'class-transformer';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { StatusEnum } from '../enums/Status.enum';

@Entity({ name: 'products' })
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, type: 'varchar' })
    title: string;

    @Column({ length: 120, type: 'varchar', unique: true })
    slug: string;

    @Column({ length: 500, type: 'varchar' })
    description: string;

    @Column({ precision: 18, scale: 2, type: 'decimal', default: 0.00 })
    priceCost: number;

    @Column({ precision: 18, scale: 2, type: 'decimal', default: 0.00 })
    pricePublic: number;

    @Column({ length: 800, type: 'varchar', nullable: true })
    observations: string;

    @Column({ type: 'enum', enum: StatusEnum, default: StatusEnum.ACTIVE })
    @Exclude({ toPlainOnly: true })
    status: StatusEnum;

    toJSON(): Partial<Product> {
        return instanceToPlain(this);
    }
}