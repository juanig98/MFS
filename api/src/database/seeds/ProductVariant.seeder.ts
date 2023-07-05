import { getRandomNumber } from 'src/common/helpers';
import { Brand } from 'src/models/entities/Brand.entity';
import { Product } from 'src/models/entities/Product.entity';
import { ProductVariant } from 'src/models/entities/ProductVariant.entity';
import { StatusEnum } from 'src/models/enums/Status.enum';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class ProductVariantSeeder implements Seeder {
    async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<any> {
        const repoProduct = dataSource.getRepository(Product);
        const repoBrand = dataSource.getRepository(Brand);
        const repoProductVariant = dataSource.getRepository(ProductVariant);
        const factory = factoryManager.get(ProductVariant);

        const allProducts = await repoProduct.findBy({ status: StatusEnum.ACTIVE });

        if (!await repoProductVariant.count()) {
            const allBrands = await repoBrand.findBy({ status: StatusEnum.ACTIVE });

            for await (const product of allProducts) {
                const __brand1 = allBrands[getRandomNumber(1, allBrands.length - 1)]
                const make = await factory.make();
                await repoProductVariant.save({ brand: __brand1, product, ...make })

                if (Math.random() > 0.5) {
                    const make2 = await factory.make();
                    const __brand2 = allBrands.filter(c => c.id != __brand1.id)[getRandomNumber(1, allBrands.length - 2)]
                    await repoProductVariant.save({ brand: __brand2, product, ...make2 })

                    if (Math.random() > 0.7) {
                        const make3 = await factory.make();
                        const __brand3 = allBrands.filter(c => c.id != __brand1.id && c.id != __brand2.id)[getRandomNumber(1, allBrands.length - 3)]
                        await repoProductVariant.save({ brand: __brand3, product, ...make3 })
                    }
                }

            }
        }

    }
}