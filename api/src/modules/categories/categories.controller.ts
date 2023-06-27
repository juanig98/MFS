import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryCreateDto } from './dtos/CategoryCreateDto';
import { CategoryUpdateDto } from './dtos/CategoryUpdateDto';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly service: CategoriesService) { }

    @Get()
    async findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.service.findOne(id);
    }

    @Post()
    async create(@Body() createCategoryDto: CategoryCreateDto) {
        return this.service.create(createCategoryDto);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() updateCategoryDto: CategoryUpdateDto) {
        return this.service.update(id, updateCategoryDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        return this.service.remove(id);
    }
}
