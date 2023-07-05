import { getRandomNumber } from 'src/common/helpers';
import { Characteristic } from 'src/models/entities/Characteristic.entity';
import { Product } from 'src/models/entities/Product.entity';
import { ProductCharacteristic } from 'src/models/entities/ProductCharacteristic.entity';
import { StatusEnum } from 'src/models/enums/Status.enum';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class ProductCharacteristicSeeder implements Seeder {

    createValue(characteristic: Characteristic): string {
        if (Boolean(characteristic.isCheck)) return Math.random() < 0.5 ? 'true' : 'false';
        if (Boolean(characteristic.isNumber)) return (Math.floor(Math.random() * 100) + 1).toString();
        return ["Valor 1", "Valor 2", "Valor 3", "Valor 4", "Valor 5", "Valor 6", "Valor 7", "Valor 8", "Valor 9", "Valor 10"][Math.floor(Math.random() * 10)];
    }

    async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<any> {
        const repoProduct = await dataSource.getRepository(Product);
        const repoCharacteristic = await dataSource.getRepository(Characteristic);
        const repoProductCharacteristic = await dataSource.getRepository(ProductCharacteristic);

        const allProducts = await repoProduct.findBy({ status: StatusEnum.ACTIVE });

        if (!await repoProductCharacteristic.count()) {
            const __allCharacts = await repoCharacteristic.findBy({ status: StatusEnum.ACTIVE });

            for await (const product of allProducts) {
                let __filterCharacts = __allCharacts;
                let allCharacteristicsOfProduct: ProductCharacteristic[] = [];
                let characteristic: Characteristic;
                let __counter = 0;

                while (!product || allCharacteristicsOfProduct.length < 8) {
                    characteristic = __filterCharacts[getRandomNumber(1, __filterCharacts.length - 1)]

                    await repoProductCharacteristic.save({
                        characteristic,
                        product,
                        isPrincipal: __counter <= 3,
                        isImportant: __counter <= 5,
                        value: this.createValue(characteristic),
                    })

                    __filterCharacts = __filterCharacts.filter(c => c.id != characteristic.id);
                    allCharacteristicsOfProduct = await repoProductCharacteristic.findBy({ productId: product.id });
                    __counter++;
                }
            }
        }
    }
}