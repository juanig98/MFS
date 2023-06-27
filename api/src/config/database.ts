import * as dotenv from "dotenv";
import { DataSource, DataSourceOptions, QueryRunner, SelectQueryBuilder } from 'typeorm';
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";  

dotenv.config({ path: __dirname.substring(0, __dirname.search("dist/")).concat(".env") });

export function ParameterDecorators<T>(queryRunner: QueryRunner, queryBuilder: SelectQueryBuilder<T>): SelectQueryBuilder<T> {
    return queryBuilder.setParameter('datefirst', 1).setParameter('dateformat', 'dmy').setParameters({ ...queryBuilder.getParameters() });
}

export const database: MysqlConnectionOptions & { autoLoadEntities: boolean, options: any } = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    username: 'root',
    password: 'mysql123',
    database: 'mfs',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: ["error"],
    
    autoLoadEntities: true, 
    options: {         
        
        appName: "MFS(node)"
    },
}

export const AppDataSource = new DataSource(<DataSourceOptions>database);
