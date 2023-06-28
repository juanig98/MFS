import slugify from "slugify";

import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker/locale/es_MX';
import { Product } from "src/models/entities/Product.entity";

export default setSeederFactory(Product, async () => {
    const product = new Product();
    product.description = faker.commerce.productName();
    
    product.slug = slugify(product.description);
    return product;
}); 