import slugify from "slugify";

import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker/locale/es_MX';
import { Product } from "src/models/entities/Product.entity";

export default setSeederFactory(Product, async () => {
    const product = new Product({});
    product.title = faker.commerce.productName();
    product.slug = slugify(product.title).toLowerCase();
    product.description = faker.commerce.productDescription();
    return product;
}); 