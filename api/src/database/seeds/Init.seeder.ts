
import { DataSource } from 'typeorm';
import { runSeeders, Seeder, SeederFactoryManager } from 'typeorm-extension';
import CategoryFactory from '../factories/Category.factory';
import ImageFactory from '../factories/Image.factory';
import ProductFactory from '../factories/Product.factory';
import CategorySeeder from './Category.seeder';
import ImageSeeder from './Image.seeder';
import ProductSeeder from './Product.seeder';
import ProductCategorySeeder from './ProductCategory.seeder';
import ProductImageSeeder from './ProductImage.seeder';
import UserSeeder from './User.seeder';
import CharacteristicSeeder from './Characteristic.seeder';
import ProductCharacteristicSeeder from './ProductCharacteristic.seeder';
import ProductVariantFactory from '../factories/ProductVariant.factory';
import ProductVariantSeeder from './ProductVariant.seeder';


export default class InitSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<any> {
        await runSeeders(dataSource, {
            seeds: [
                UserSeeder, 
                ImageSeeder,
                CategorySeeder,
                CharacteristicSeeder,
                ProductSeeder,
                ProductCategorySeeder, 
                ProductImageSeeder,
                ProductCharacteristicSeeder,
                ProductVariantSeeder
            ],
            factories: [
                CategoryFactory,
                ProductFactory,
                ImageFactory,
                ProductVariantFactory,
            ],
        });
    }
}