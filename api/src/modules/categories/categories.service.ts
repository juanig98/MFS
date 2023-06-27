import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/models/entities/Category.entity';
import { StatusEnum } from 'src/models/enums/Status.enum';
import { CategoryCreateDto } from './dtos/CategoryCreateDto';
import { CategoryUpdateDto } from './dtos/CategoryUpdateDto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly repository: Repository<Category>,
    ) { }

    async findAll(): Promise<Category[]> {
        return this.repository.findBy({ status: StatusEnum.ACTIVE });
    }

    async findOne(id: number): Promise<Category> {
        return this.repository.findOneBy({ id, status: StatusEnum.ACTIVE });
    }

    async create(categoryCreateDto: CategoryCreateDto): Promise<Category> {
        const category = this.repository.create(categoryCreateDto);
        return await this.repository.save(category);
    }

    async update(id: number, categoryUpdateDto: CategoryUpdateDto): Promise<Category> {
        const category = await this.repository.findOneBy({ id });
        if (!category) {
            throw new Error('Categoría no encontrada');
        }
        this.repository.merge(category, categoryUpdateDto);
        return this.repository.save(category);
    }

    async remove(id: number): Promise<void> {
        await this.repository.update(id, { status: StatusEnum.INACTIVE });
    }
}
