import * as dotenv from "dotenv"; 
import { entityList } from "src/models/entities/entityList";
import { DataSource, DataSourceOptions, QueryRunner, SelectQueryBuilder } from 'typeorm';
import { SeederOptions } from "typeorm-extension";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

dotenv.config({ path: __dirname.substring(0, __dirname.search("dist/")).concat(".env") });

export function ParameterDecorators<T>(queryRunner: QueryRunner, queryBuilder: SelectQueryBuilder<T>): SelectQueryBuilder<T> {
    return queryBuilder.setParameter('datefirst', 1).setParameter('dateformat', 'dmy').setParameters({ ...queryBuilder.getParameters() });
}

export const database: MysqlConnectionOptions & { autoLoadEntities: boolean, options: any } & SeederOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    // entities: ['dist/**/*.entity{.ts,.js}', './../models/**/*.entity{.ts,.js}'],
    entities: [...entityList],
    synchronize: true,
    autoLoadEntities: true,
    logging: ["error"],
    seeds: ['src/database/seeds/**/*{.ts,.js}'],
    factories: ['src/database/factories/**/*{.ts,.js}'],
    options: {
        appName: "MFS(node)"
    },
}
export const AppDataSource = new DataSource(<DataSourceOptions>database); 
