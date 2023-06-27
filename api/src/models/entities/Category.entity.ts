import { Exclude, instanceToPlain } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { StatusEnum } from '../enums/Status.enum';

@Entity({ name: 'categories' })
export class Category {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'description', length: 100, type: 'varchar' })
    description: string;

    @Column({ name: 'slug', length: 150, type: 'varchar', unique: true })
    slug: string;

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

    toJSON(): Partial<Category> {
        return instanceToPlain(this);
    }
}