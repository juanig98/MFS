import { Exclude, instanceToPlain } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TextNumberEnum } from '../enums/TextNumber.enum';

@Entity({ name: 'sizes' })
export class Size {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'description', length: 100, type: 'varchar' })
    description: string;

    @Column({ name: 'type', type: 'enum', enum: TextNumberEnum, default: TextNumberEnum.NUMBER })
    type: string;

    @Column({ name: 'maximum', precision: 18, scale: 2, type: 'decimal' })
    maximum: string;

    @Column({ name: 'minimum', precision: 18, scale: 2, type: 'decimal' })
    minimum: string;

    @Column({ name: 'suffix', length: 10, type: 'char' })
    suffix: string;

    @Column({ name: 'prefix', length: 10, type: 'char' })
    prefix: string;

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

    toJSON(): Partial<Size> {
        return instanceToPlain(this);
    }
}  