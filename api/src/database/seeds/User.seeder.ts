
import { User } from 'src/models/entities/User.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { userFactory } from '../factories/User.factory';
import * as bcrypt from 'bcrypt';

export default class UserSeeder implements Seeder {
    async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<any> {
        const repository = await dataSource.getRepository(User)
        if (!await repository.count()) {
            for await (const user of userFactory) {
                user.password = await bcrypt.hash(user.password, 10)
                await repository.save(user);
            }
        }
    }
}