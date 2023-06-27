import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { Product } from './Product.entity';
import { Size } from './Size.entity';
import { Exclude, instanceToPlain } from 'class-transformer';
import { StatusEnum } from '../enums/Status.enum';

@Entity({ name: 'productsSizes' })
export class ProductSize {

    @PrimaryColumn({ name: 'productId' })
    productId: number;

    @PrimaryColumn({ name: 'sizeId' })
    sizeId: number;

    @OneToOne(() => Product)
    @JoinColumn({ name: 'productId' })
    product: Product;

    @OneToOne(() => Size)
    @JoinColumn({ name: 'sizeId' })
    size: Size;

    @Column({ name: 'value', length: 25, type: 'varchar' })
    value: string;
    
    @Column({ name: 'quantity', type: 'int' })
    quantity: number;
    
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

    toJSON(): Partial<ProductSize> {
        return instanceToPlain(this);
    }
}