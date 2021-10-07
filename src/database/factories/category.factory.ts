import Faker from 'faker';
import { Category } from 'src/categories/entities/category.entity';
import { define } from 'typeorm-seeding';

define(Category, (faker: typeof Faker) => {
  const category = new Category();
  category.name = faker.company.companyName();
  category.uuid = faker.random.uuid();
  category.isActive = true;
  category.description = 'ok';
  return category;
});
