import { Brand } from 'src/models/entities/Brand.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { brandFactory } from '../factories/Brand.factory';
import slugify from 'slugify';

export default class BrandSeeder implements Seeder {
    async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<any> {
        const repository = await dataSource.getRepository(Brand)

        if (!await repository.count()) {
            for await (const brand of brandFactory) {
                brand.slug = slugify(brand.description.toLowerCase())
                await repository.save(brand);
            }
        }
    }
}