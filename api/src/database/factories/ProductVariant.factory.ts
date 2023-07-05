
import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker/locale/es_MX';
import { ProductVariant } from "src/models/entities/ProductVariant.entity";

export default setSeederFactory(ProductVariant, async () => {
    const product = new ProductVariant();
    product.priceCost = faker.number.float({ min: 500, max: 100000, precision: 0.01 });
    product.pricePublic = product.priceCost * faker.number.float({ min: 1.1, max: 1.8, precision: 0.1 })
    return product;
}); 