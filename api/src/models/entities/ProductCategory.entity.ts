import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Product } from './Product.entity';
import { Exclude, instanceToPlain } from 'class-transformer';
import { Category } from './Category.entity';
import { StatusEnum } from '../enums/Status.enum';

@Entity({ name: 'productsCategories' })
export class ProductCategory {

    @PrimaryColumn({ name: 'productId' })
    productId: number;

    @PrimaryColumn({ name: 'categoryId' })
    categoryId: number;

    @OneToOne(() => Product)
    @JoinColumn({ name: 'productId' })
    product: Product;

    @OneToOne(() => Category)
    @JoinColumn({ name: 'categoryId' })
    category: Category; 

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

    toJSON(): Partial<ProductCategory> {
        return instanceToPlain(this);
    }
}