
import { DataSource } from 'typeorm';
import { runSeeders, Seeder, SeederFactoryManager } from 'typeorm-extension';
import CategoryFactory from '../factories/Category.factory';
import CategorySeeder from './Category.seeder';
import SizeSeeder from './Size.seeder';
import UserSeeder from './User.seeder';
import ProductFactory from '../factories/Product.factory';
import ProductSeeder from './Product.seeder'; 
import ProductCategorySeeder from './ProductCategory.seeder';
import ImageSeeder from './Image.seeder';
import ImageFactory from '../factories/Image.factory';
import ProductSizeSeeder from './ProductSize.seeder';
import ProductImageSeeder from './ProductImage.seeder'; 


export default class InitSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<any> {
        await runSeeders(dataSource, {
            seeds: [
                UserSeeder,
                SizeSeeder,
                ImageSeeder,
                CategorySeeder,
                ProductSeeder,
                ProductCategorySeeder,
                ProductSizeSeeder,
                ProductImageSeeder,
            ],
            factories: [
                CategoryFactory,
                ProductFactory,
                ImageFactory,
            ],
        });
    }
}