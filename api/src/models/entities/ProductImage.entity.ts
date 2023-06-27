import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Product } from './Product.entity';
import { Exclude, instanceToPlain } from 'class-transformer';
import { Image } from './Image.entity';

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

    @Column({ name: 'status', type: 'tinyint' })
    @Exclude({ toPlainOnly: true })
    status: number;

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