import slugify from "slugify";

import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker/locale/es_MX';
import { Product } from "src/models/entities/Product.entity";

export default setSeederFactory(Product, async () => {
    const product = new Product();
    product.title = faker.commerce.productName();
    product.slug = slugify(product.title).toLowerCase();
    product.description = faker.commerce.productDescription();
    product.priceCost = faker.number.float({ min: 500, max: 100000, precision: 0.01 });
    product.pricePublic = product.priceCost * faker.number.float({ min: 1.1, max: 1.8, precision: 0.1 })
    return product;
}); 