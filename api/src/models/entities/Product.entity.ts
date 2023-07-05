import { Exclude, Expose, Transform, instanceToPlain } from 'class-transformer';
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

    @OneToMany(() => ProductCategory, x => x.product, { eager: true })
    @Expose()
    @Transform(({ value }) => value
        .map(c => c.category)
        .map(c => ({
            id: c.id,
            description: c.description
        })))
    public categories!: ProductCategory[];

    @OneToMany(() => ProductImage, x => x.product, { eager: true })
    @Expose()
    @Transform(({ value }) => value
        .filter((ci: ProductImage) => ci.principal)
        .map((ci: ProductImage) => ci.image.path))
    public imgPrincipal!: ProductImage[];

    @OneToMany(() => ProductVariant, x => x.product, { eager: true })
    @Expose({ groups: ['public'] })
    @Transform(({ value }) => value
        .map((pv: ProductVariant) => ({
            quantity: pv.quantity,
            brand: pv.brand.description,
            price: pv.pricePublic
        })))
    public variants!: ProductVariant[];

    @OneToMany(() => ProductVariant, x => x.product, { eager: true })
    @Expose({ groups: ['backoffice'] })
    @Transform(({ value }) => value
        .map((pv: ProductVariant) => ({
            quantity: pv.quantity,
            brand: pv.brand.description,
            priceCost: pv.priceCost,
            pricePublic: pv.pricePublic,
        })))
    public variantsB!: ProductVariant[];

    @OneToMany(() => ProductCharacteristic, x => x.product, { eager: true })
    @Expose()
    @Transform(({ value }) => value
        .map((cs: ProductCharacteristic) => ({
            title: cs.characteristic.title,
            description: cs.characteristic.description,
            abbreviation: cs.characteristic.abbreviation,
            prefix: cs.characteristic.prefix,
            suffix: cs.characteristic.suffix,
            thumbnailPath: cs.characteristic.thumbnailPath,
            value: cs.value
        })))
    public characteristics!: ProductCharacteristic[];



    @OneToMany(() => ProductImage, x => x.product, { lazy: true })
    @Transform(({ value }) => value.map((ci: ProductImage) => ci.image.path))
    public images!: ProductImage[];

    constructor(partial: Partial<Product>) {
        super();
        Object.assign(this, partial);
    }

    toJSON(): Partial<Product> {
        return instanceToPlain(this, { groups: ['public'] });
    }
}