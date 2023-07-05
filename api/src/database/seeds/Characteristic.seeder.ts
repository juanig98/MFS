import { Characteristic } from 'src/models/entities/Characteristic.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { characteristicFactory } from '../factories/Characteristic.factory';
import slugify from 'slugify';

export default class CharacteristicSeeder implements Seeder {
    async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<any> {
        const repository = await dataSource.getRepository(Characteristic)

        if (!await repository.count()) {
            for await (const characteristic of characteristicFactory) {
                characteristic.slug = slugify(characteristic.description.toLowerCase());
                await repository.save(characteristic);
            }
        }
    }
}