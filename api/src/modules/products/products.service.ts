import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/models/entities/Product.entity';
import { Repository } from 'typeorm';
import { ProductCreateDto } from './dtos/ProductCreateDto';
import { ProductUpdateDto } from './dtos/ProductUpdateDto';
import { StatusEnum } from 'src/models/enums/Status.enum';

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Product)
        private readonly repository: Repository<Product>,
    ) { }

    async findAll(): Promise<Product[]> {
        return this.repository.findBy({ status: StatusEnum.ACTIVE });
    }

    async findOne(id: number): Promise<Product> {
        return this.repository.findOneBy({ id, status: StatusEnum.ACTIVE });
    }

    async create(productCreateDto: ProductCreateDto): Promise<Product> {
        const product = this.repository.create(productCreateDto);
        return this.repository.save(product);
    }

    async update(id: number, productUpdateDto: ProductUpdateDto): Promise<Product> {
        const product = await this.repository.findOneBy({ id, status: StatusEnum.ACTIVE });
        if (!product) throw new Error('***Producto no encontrado');
        this.repository.merge(product, productUpdateDto);
        return this.repository.save(product);
    }

    async remove(id: number): Promise<void> {
        await this.repository.update(id, { status: StatusEnum.INACTIVE });
    }
}
