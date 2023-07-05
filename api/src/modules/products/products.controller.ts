import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductCreateDto } from './dtos/ProductCreateDto';
import { ProductUpdateDto } from './dtos/ProductUpdateDto';
import { Product } from 'src/models/entities/Product.entity';

@Controller('products')
export class ProductsController {

    constructor(private readonly service: ProductsService) { }

    @Get()
    async findAll(): Promise<Product[]> {
        return await this.service.findAll([ 
            'variants',
            'variants.brand',
        ]);
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Product> {
        return await this.service.findOne(id);
    }

    @Post()
    async create(@Body() productCreateDto: ProductCreateDto): Promise<Product> {
        return await this.service.create(productCreateDto);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() productUpdateDto: ProductUpdateDto): Promise<Product> {
        return await this.service.update(id, productUpdateDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        return await this.service.remove(id);
    }
}
