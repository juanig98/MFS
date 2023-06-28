import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker/locale/es_MX';
import { Image } from 'src/models/entities/Image.entity';

export default setSeederFactory(Image, async () => {
    const image = new Image();
    image.path = faker.image.urlLoremFlickr({ height: 600, width: 800, category: 'furniture' })
    return image;
}); 