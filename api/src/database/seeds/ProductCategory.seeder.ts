import { getRandomNumber } from 'src/common/helpers';
import { Category } from 'src/models/entities/Category.entity';
import { Product } from 'src/models/entities/Product.entity';
import { ProductCategory } from 'src/models/entities/ProductCategory.entity';
import { StatusEnum } from 'src/models/enums/Status.enum';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension'; 

export default class ProductCategorySeeder implements Seeder {
    async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<any> {
        const repoProduct = await dataSource.getRepository(Product);
        const repoCategory = await dataSource.getRepository(Category);
        const repoProductCategory = await dataSource.getRepository(ProductCategory);

        const allProducts = await repoProduct.findBy({ status: StatusEnum.ACTIVE });

        if (!await repoProductCategory.count()) {
            const allCategories = await repoCategory.findBy({ status: StatusEnum.ACTIVE });

            for await (const product of allProducts) {
                let category = allCategories[getRandomNumber(1, allCategories.length - 1)]
                await repoProductCategory.save({ category, product })
                if (Math.random() > 0.7) {
                    category = allCategories.filter(c => c.id != category.id)[getRandomNumber(1, allCategories.length - 2)]
                    await repoProductCategory.save({ category, product })
                }

            }
        }
    }
}