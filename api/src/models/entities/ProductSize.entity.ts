import { Exclude, instanceToPlain } from 'class-transformer';
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { StatusEnum } from '../enums/Status.enum';
import { Product } from './Product.entity';
import { Size } from './Size.entity';

@Entity({ name: 'productsSizes' })
export class ProductSize extends BaseEntity {

    @PrimaryColumn()
    productId: number;

    @PrimaryColumn()
    sizeId: number;

    @OneToOne(() => Product)
    @JoinColumn({ name: 'productId' })
    product: Product;

    @OneToOne(() => Size)
    @JoinColumn({ name: 'sizeId' })
    size: Size;

    @Column({ length: 25, type: 'varchar' })
    value: string;

    @Column({ type: 'int' })
    quantity: number;

    @Column({ length: 800, type: 'varchar' })
    observations: string;

    @Column({ type: 'enum', enum: StatusEnum, default: StatusEnum.ACTIVE })
    @Exclude({ toPlainOnly: true })
    status: StatusEnum;
 
    toJSON(): Partial<ProductSize> {
        return instanceToPlain(this);
    }
}