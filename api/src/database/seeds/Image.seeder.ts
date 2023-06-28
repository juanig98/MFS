import { Image } from 'src/models/entities/Image.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class ImageSeeder implements Seeder {
    async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<any> {
        const repository = await dataSource.getRepository(Image)
        if (!await repository.count()) {

            const factory = await factoryManager.get(Image);
            let counter = 1;
            while ((await repository.count()) < 160) {
                const make = await factory.make();
                make.filename = `image-${counter}`;
                make.description = `Description of image n° ${counter}`
                make.type = make.path.substring(make.path.length - 3);
                if (!await repository.exist({ where: { description: make.description } })) {
                    await factory.save(make);
                }
                counter++;
            }
        }
    }
}