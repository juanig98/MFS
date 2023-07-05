import { Exclude, instanceToPlain } from 'class-transformer';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StatusEnum } from '../enums/Status.enum';
import { ProductCategory } from './ProductCategory.entity';
import { ProductVariant } from './ProductVariant.entity';
import { ProductImage } from './ProductImage.entity';
import { ProductCharacteristic } from './ProductCharacteristic.entity';

@Entity({ name: 'products' })
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, type: 'varchar' })
    title: string;

    @Column({ length: 120, type: 'varchar', unique: true })
    slug: string;

    @Column({ length: 500, type: 'varchar' })
    description: string;

    @Column({ length: 800, type: 'varchar', nullable: true })
    observations: string;

    @Column({ type: 'enum', enum: StatusEnum, default: StatusEnum.ACTIVE })
    @Exclude({ toPlainOnly: true })
    status: StatusEnum;

    @OneToMany(() => ProductCategory, x => x.product)
    public categories!: ProductCategory[];

    @OneToMany(() => ProductVariant, x => x.product)
    public variants!: ProductVariant[];

    @OneToMany(() => ProductCharacteristic, x => x.product)
    public characteristics!: ProductCharacteristic[];

    @OneToMany(() => ProductImage, x => x.product)
    public images!: ProductImage[];

    toJSON(): Partial<Product> {
        return instanceToPlain(this);
    }
}