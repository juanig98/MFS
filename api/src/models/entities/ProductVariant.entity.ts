import { Exclude, instanceToPlain } from 'class-transformer';
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { StatusEnum } from '../enums/Status.enum';
import { Brand } from './Brand.entity';
import { Product } from './Product.entity';

@Entity({ name: 'productsVariants' })
export class ProductVariant extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productId: number;

    @Column({ nullable: true })
    brandId: number;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'productId' })
    product: Product;

    @ManyToOne(() => Brand, { nullable: true, eager: true })
    @JoinColumn({ name: 'brandId' })
    brand: Brand;

    @Column({ type: 'int', default: 1 })
    quantity: number;

    @Column({ precision: 18, scale: 2, type: 'decimal', default: 0.00 })
    priceCost: number;

    @Column({ precision: 18, scale: 2, type: 'decimal', default: 0.00 })
    pricePublic: number;

    @Column({ length: 800, type: 'varchar', nullable: true })
    observations: string;

    @Column({ type: 'enum', enum: StatusEnum, default: StatusEnum.ACTIVE })
    @Exclude({ toPlainOnly: true })
    status: StatusEnum;

    toJSON(): Partial<ProductVariant> {
        return instanceToPlain(this);
    }
}