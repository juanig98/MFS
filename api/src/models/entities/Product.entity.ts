import { Exclude, instanceToPlain } from 'class-transformer';
import { BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { StatusEnum } from '../enums/Status.enum';
import { ProductCategory } from './ProductCategory.entity';
import { ProductSize } from './ProductSize.entity';
import { ProductImage } from './ProductImage.entity';

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

    @OneToMany(() => ProductCategory, x => x.product)
    public categories!: ProductCategory[];
    
    @OneToMany(() => ProductSize, x => x.product)
    public sizes!: ProductSize[];

    @OneToMany(() => ProductImage, x => x.product)
    public images!: ProductImage[];

    toJSON(): Partial<Product> {
        return instanceToPlain(this);
    }
}