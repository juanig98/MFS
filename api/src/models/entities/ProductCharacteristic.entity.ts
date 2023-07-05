import { Exclude, instanceToPlain } from 'class-transformer';
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { StatusEnum } from '../enums/Status.enum';
import { Product } from './Product.entity';
import { Characteristic } from './Characteristic.entity';

@Entity({ name: 'productsCharacteristics' })
export class ProductCharacteristic extends BaseEntity {

    @PrimaryColumn()
    productId: number;

    @PrimaryColumn()
    characteristicId: number;

    @OneToOne(() => Product)
    @JoinColumn({ name: 'productId' })
    product: Product;

    @OneToOne(() => Characteristic, { eager: true })
    @JoinColumn({ name: 'characteristicId' })  
    characteristic: Characteristic;

    @Column({ length: 800, type: 'varchar', nullable: false })
    value: string;

    @Column({ type: 'boolean', default: false })
    isPrincipal: boolean;

    @Column({ type: 'boolean', default: false })
    isImportant: boolean;

    @Column({ length: 800, type: 'varchar', nullable: true })
    observations: string;

    @Column({ type: 'enum', enum: StatusEnum, default: StatusEnum.ACTIVE })
    @Exclude({ toPlainOnly: true })
    status: StatusEnum;

    toJSON(): Partial<ProductCharacteristic> {
        return instanceToPlain(this);
    }
}