import { Exclude, instanceToPlain } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'products' })
export class Product {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'title', length: 100, type: 'varchar' })
    title: string;

    @Column({ name: 'slug', length: 120, type: 'varchar', unique: true })
    slug: string;

    @Column({ name: 'description', length: 500, type: 'varchar' })
    description: string; 

    @Column({ name: 'priceCost', precision: 18, scale: 2, type: 'decimal', default: 0.00 })
    priceCost: string;

    @Column({ name: 'pricePublic', precision: 18, scale: 2, type: 'decimal', default: 0.00 })
    pricePublic: string;
 
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

    toJSON(): Partial<Product> {
        return instanceToPlain(this);
    }
}