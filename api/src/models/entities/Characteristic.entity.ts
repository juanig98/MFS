import { Exclude, instanceToPlain } from 'class-transformer';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { StatusEnum } from '../enums/Status.enum';

@Entity({ name: 'characteristics' })
export class Characteristic extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, type: 'varchar' })
    title: string;

    @Column({ length: 100, type: 'varchar' })
    description: string;

    @Column({ length: 100, type: 'varchar', nullable: true })
    abbreviation: string;

    @Column({ length: 150, type: 'varchar', unique: true })
    slug: string;

    @Column({ length: 100, type: 'varchar', nullable: true })
    default: string;

    @Column({ length: 50, type: 'varchar', nullable: true })
    prefix: string;

    @Column({ length: 50, type: 'varchar', nullable: true })
    suffix: string;

    @Column({ type: 'boolean', default: true })
    isNumber: boolean;

    @Column({ type: 'boolean', default: false })
    isCheck: boolean;

    @Column({ type: 'boolean', default: false })
    isString: boolean;

    @Column({ type: 'boolean', default: true })
    isUnique: boolean;

    @Column({ length: 300, type: 'varchar', nullable: true })
    thumbnailPath: string;

    @Column({ length: 800, type: 'varchar', nullable: true })
    observations: string;

    @Column({ type: 'enum', enum: StatusEnum, default: StatusEnum.ACTIVE })
    @Exclude({ toPlainOnly: true })
    status: StatusEnum;

    toJSON(): Partial<Characteristic> {
        return instanceToPlain(this);
    }
}