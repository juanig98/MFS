import { getRandomNumber } from 'src/common/helpers';
import { Category } from 'src/models/entities/Category.entity';
import { Product } from 'src/models/entities/Product.entity';
import { ProductCategory } from 'src/models/entities/ProductCategory.entity';
import { ProductSize } from 'src/models/entities/ProductSize.entity';
import { Size } from 'src/models/entities/Size.entity';
import { StatusEnum } from 'src/models/enums/Status.enum';
import { DataSource, Like } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
// const repoImage = await dataSource.getRepository(Image);

// const repoProductImage = await dataSource.getRepository(ProductImage);
export default class ProductSizeSeeder implements Seeder {
    async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<any> {
        const repoProduct = await dataSource.getRepository(Product);
        const repoSize = await dataSource.getRepository(Size);
        const repoProductSize = await dataSource.getRepository(ProductSize);

        const allProducts = await repoProduct.findBy({ status: StatusEnum.ACTIVE });

        if (!await repoProductSize.count()) {
            const sizeLargo = await repoSize.findOneBy({ description: Like('Centímetros (largo)'), status: StatusEnum.ACTIVE });
            const sizeAncho = await repoSize.findOneBy({ description: Like('Centímetros (ancho)'), status: StatusEnum.ACTIVE });
            const sizeAlt = await repoSize.findOneBy({ description: Like('Centímetros (altura)'), status: StatusEnum.ACTIVE });
            const sizeEspesor = await repoSize.findOneBy({ description: Like('Centímetros (espesor)'), status: StatusEnum.ACTIVE });

            let value = 0;
            let quantity = 1;
            for await (const product of allProducts) {
                value = getRandomNumber(1, 100);
                quantity = getRandomNumber(1, 6);
                await repoProductSize.save({ size: sizeLargo, product, value: value.toString(), quantity })
                value = getRandomNumber(1, 100);
                quantity = getRandomNumber(1, 6);
                await repoProductSize.save({ size: sizeAncho, product, value: value.toString(), quantity })
                value = getRandomNumber(1, 100);
                quantity = getRandomNumber(1, 6);
                await repoProductSize.save({ size: sizeAlt, product, value: value.toString(), quantity })
                value = getRandomNumber(1, 100);
                quantity = getRandomNumber(1, 6);
                await repoProductSize.save({ size: sizeEspesor, product, value: value.toString(), quantity })
            }
        }
    }
}