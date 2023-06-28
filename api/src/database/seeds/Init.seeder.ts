
import { DataSource } from 'typeorm';
import { runSeeders, Seeder, SeederFactoryManager } from 'typeorm-extension';
import CategorySeeder from './Category.seeder';
import CategoryFactory from '../factories/Category.factory';


export default class InitSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<any> {
        await runSeeders(dataSource, {
            seeds: [CategorySeeder],
            factories: [CategoryFactory],
        });
    }
}