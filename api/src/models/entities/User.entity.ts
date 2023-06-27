import { Exclude, instanceToPlain } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'username', length: 50, type: 'varchar' })
    username: string;

    @Column({ name: 'password', length: 100, type: 'varchar' })
    @Exclude({ toPlainOnly: true })
    password: string;

    @Column({ name: 'email', length: 150, type: 'varchar', unique: true })
    email: string;

    @Column({ name: 'observations', length: 800, type: 'varchar' })
    @Exclude({ toPlainOnly: true })
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

    toJSON(): Partial<User> {
        return instanceToPlain(this);
    }

    toValidate(): Partial<User> {
        return { id: this.id };
    }
}
