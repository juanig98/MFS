import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller'; 
import { AuthModule } from './modules/auth/auth.module'; 
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';   

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public'), serveRoot: '/api/v1/public/' }),
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        ...config.get('database'),
        queryDecorators: config.get('database.queryDecorators')
      })
    }), 
    AuthModule, ProductsModule, UsersModule, 
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
