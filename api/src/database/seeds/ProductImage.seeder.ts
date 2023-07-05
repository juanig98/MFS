import { getRandomNumber } from 'src/common/helpers';
import { Image } from 'src/models/entities/Image.entity';
import { Product } from 'src/models/entities/Product.entity';
import { ProductImage } from 'src/models/entities/ProductImage.entity';
import { StatusEnum } from 'src/models/enums/Status.enum';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class ProductImageSeeder implements Seeder {
    async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<any> {
        const repoProduct = await dataSource.getRepository(Product);
        const repoImage = await dataSource.getRepository(Image);
        const repoProductImage = await dataSource.getRepository(ProductImage);

        const allProducts = await repoProduct.findBy({ status: StatusEnum.ACTIVE });

        if (!await repoProductImage.count()) {
            const allImages = await repoImage.findBy({ status: StatusEnum.ACTIVE });
            const quantityImages = getRandomNumber(3, 6);

            for await (const product of allProducts) {
                for (let i = 0; i < quantityImages; i++) {
                    await repoProductImage.save({
                        principal: i == 0,
                        product,
                        image: allImages[getRandomNumber(1, allImages.length - 1)],
                    })

                }
            }
        }
    }
}