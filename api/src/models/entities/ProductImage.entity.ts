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

    @OneToOne(() => Image)
    @JoinColumn({ name: 'imageId' })
    image: Image;

    @Column({ length: 800, type: 'varchar' })
    observations: string;

    @Column({ type: 'enum', enum: StatusEnum, default: StatusEnum.ACTIVE })
    @Exclude({ toPlainOnly: true })
    status: StatusEnum;

    toJSON(): Partial<ProductImage> {
        return instanceToPlain(this);
    }
}