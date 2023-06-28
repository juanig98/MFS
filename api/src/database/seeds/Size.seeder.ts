import { Size } from 'src/models/entities/Size.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { sizeFactory } from '../factories/Size.factory';

export default class SizeSeeder implements Seeder {
    async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<any> {
        const repository = await dataSource.getRepository(Size)

        if (!await repository.count()) {
            for await (const size of sizeFactory) {
                await repository.save(size);
            }
        }
    }
}