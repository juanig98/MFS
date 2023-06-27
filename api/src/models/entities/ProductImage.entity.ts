import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Product } from './Product.entity';
import { Exclude, instanceToPlain } from 'class-transformer';
import { Image } from './Image.entity';
import { StatusEnum } from '../enums/Status.enum';

@Entity({ name: 'productsImages' })
export class ProductImage {

    @PrimaryColumn({ name: 'productId' })
    productId: number;

    @PrimaryColumn({ name: 'imageId' })
    imageId: number;

    @OneToOne(() => Product)
    @JoinColumn({ name: 'productId' })
    product: Product;

    @OneToOne(() => Image)
    @JoinColumn({ name: 'imageId' })
    image: Image; 

    @Column({ name: 'observations', length: 800, type: 'varchar' })
    observations: string;

    @Column({ name: 'status', type: 'enum', enum: StatusEnum, default: StatusEnum.ACTIVE })
    @Exclude({ toPlainOnly: true })
    status: StatusEnum;

    @CreateDateColumn({ name: 'createdAt' })
    @Exclude({ toPlainOnly: true })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updatedAt' })
    @Exclude({ toPlainOnly: true })
    updatedAt: Date;

    toJSON(): Partial<ProductImage> {
        return instanceToPlain(this);
    }
}