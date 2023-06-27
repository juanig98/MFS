/* eslint-disable no-console */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { cors } from './config/cors';
import { firm } from './config/log';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import * as dotenv from "dotenv";
import * as express from "express";
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
dotenv.config({ path: __dirname.substring(0, __dirname.search("dist/")).concat(".env") });

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule, { cors: cors.active });

  app.enableCors(cors.options);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true, }));
  app.useGlobalFilters(new HttpExceptionFilter());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb' }));

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Swagger | MFS')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, { customSiteTitle: 'Swagger UI | MFS' });

  await app.listen(Number(process.env.PORT));

  console.log(firm);
  console.log(`Aplicación corriendo en: ${await app.getUrl()} \n`);
  console.log(`Entorno: ${process.env.ENVIRONMENT}`);
}
bootstrap();
