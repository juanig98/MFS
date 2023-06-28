import slugify from "slugify";
import { Category } from "src/models/entities/Category.entity";
import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker/locale/es_MX';

export default setSeederFactory(Category, async () => {
    const category = new Category();
    category.description = faker.commerce.productAdjective();
    category.slug = slugify(category.description).toLowerCase();
    return category;
}); 