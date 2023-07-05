
import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker/locale/es_MX';
import { ProductVariant } from "src/models/entities/ProductVariant.entity";

export default setSeederFactory(ProductVariant, async () => {
    const pv = new ProductVariant();
    pv.priceCost = faker.number.float({ min: 50, max: 100000.00, precision: 0.01 });
   
    pv.pricePublic = pv.priceCost * faker.number.float({ min: 1.1, max: 1.8, precision: 0.1 })
    pv.quantity = faker.number.int({ min: 0, max: 5 });
    return pv;
}); 