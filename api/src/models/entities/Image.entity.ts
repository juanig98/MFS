import { Exclude, instanceToPlain } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { StatusEnum } from '../enums/Status.enum';

@Entity({ name: 'images' })
export class Image {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'filename', length: 50, type: 'varchar' })
    filename: string;

    @Column({ name: 'type', length: 5, type: 'char' })
    type: string;

    @Column({ name: 'description', length: 50, type: 'varchar' })
    description: string;

    @Column({ name: 'path', length: 300, type: 'varchar' })
    path: string;
    
    @Column({ name: 'status', type: 'enum', enum: StatusEnum, default: StatusEnum.ACTIVE })
    @Exclude({ toPlainOnly: true })
    status: StatusEnum;

    @CreateDateColumn({ name: 'createdAt' })
    @Exclude({ toPlainOnly: true })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updatedAt' })
    @Exclude({ toPlainOnly: true })
    updatedAt: Date;

    toJSON(): Partial<Image> {
        return instanceToPlain(this);
    }
}