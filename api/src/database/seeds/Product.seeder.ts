import { Product } from 'src/models/entities/Product.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class ProductSeeder implements Seeder {
    async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<any> {
        const repository = await dataSource.getRepository(Product)

        if (!await repository.count()) {

            const factory = await factoryManager.get(Product);

            while ((await repository.count()) < 100) {
                const make = await factory.make();
                if (!await repository.exist({ where: { slug: make.slug } })) {
                    await factory.save(make);
                }
            }
        }
    }
}