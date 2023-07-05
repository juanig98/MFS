import { Exclude, instanceToPlain } from 'class-transformer';
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { StatusEnum } from '../enums/Status.enum';
import { Category } from './Category.entity';
import { Product } from './Product.entity';

@Entity({ name: 'productsCategories' })
export class ProductCategory extends BaseEntity {

    @PrimaryColumn()
    productId: number;

    @PrimaryColumn()
    categoryId: number;

    @OneToOne(() => Product)
    @JoinColumn({ name: 'productId' })
    product: Product;

    @OneToOne(() => Category, { eager: true })
    @JoinColumn({ name: 'categoryId' })
    category: Category;

    @Column({ length: 800, type: 'varchar', nullable: true })
    observations: string;

    @Column({ type: 'enum', enum: StatusEnum, default: StatusEnum.ACTIVE })
    @Exclude({ toPlainOnly: true })
    status: StatusEnum;


    toJSON(): Partial<ProductCategory> {
        return instanceToPlain(this);
    }
}