import { Exclude, instanceToPlain } from 'class-transformer';
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { StatusEnum } from '../enums/Status.enum';
import { Image } from './Image.entity';
import { Product } from './Product.entity';

@Entity({ name: 'productsImages' })
export class ProductImage extends BaseEntity {

    @PrimaryColumn()
    productId: number;

    @PrimaryColumn()
    imageId: number;

    @OneToOne(() => Product)
    @JoinColumn({ name: 'productId' })
    product: Product;

    @OneToOne(() => Image, { eager: true })
    @JoinColumn({ name: 'imageId' })
    image: Image;

    @Column({ type: 'boolean', default: false })
    principal: boolean;

    @Column({ length: 800, type: 'varchar', nullable: true })
    observations: string;

    @Column({ type: 'enum', enum: StatusEnum, default: StatusEnum.ACTIVE })
    @Exclude({ toPlainOnly: true })
    status: StatusEnum;

    toJSON(): Partial<ProductImage> {
        return instanceToPlain(this);
    }
}