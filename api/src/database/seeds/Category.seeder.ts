import { Category } from 'src/models/entities/Category.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class CategorySeeder implements Seeder {
    async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<any> {
        const repository = await dataSource.getRepository(Category)
        const factory = await factoryManager.get(Category);

        while ((await repository.count()) < 15) {
            const make = await factory.make();
            if (!await repository.exist({ where: { description: make.description } })) {
                await factory.save(make);
            }
        }
    }
}