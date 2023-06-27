import { Product } from "@prisma/client";
import { DatabaseService } from "./database-client.service";
import { HelperService } from "./helper.service";

export class ProductService extends DatabaseService {

    constructor(
        private helper: HelperService,
    ) { super() }

    async create(productDto: Partial<Product>): Promise<Product> {
        const product = await this.dbclient.product.create({
            data: {
                title: productDto.title,
                slug: this.helper.createSlug(productDto.title),
                description: productDto.description,
                priceCost: productDto.priceCost,
                pricePublic: productDto.pricePublic,
                observations: productDto.observations
            }
        })

        return product;
    }
}