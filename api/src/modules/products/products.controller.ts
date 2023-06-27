import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductCreateDto } from './dtos/ProductCreateDto';
import { ProductUpdateDto } from './dtos/ProductUpdateDto';

@Controller('products')
export class ProductsController {

    constructor(private readonly service: ProductsService) { }

    @Get()
    async findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.service.findOne(id);
    }

    @Post()
    async create(@Body() productCreateDto: ProductCreateDto) {
        return this.service.create(productCreateDto);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() productUpdateDto: ProductUpdateDto) {
        return this.service.update(id, productUpdateDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        return this.service.remove(id);
    }
}
