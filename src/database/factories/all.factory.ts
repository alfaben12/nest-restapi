import { Category } from 'src/categories/entities/category.entity';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { define } from 'typeorm-seeding';

define(Category, (faker: typeof fakerStatic) => {
  const category = new Category();
  category.uuid = faker.random.uuid();
  category.name = 'Alfa';
  category.description = faker.lorem.paragraph(1);
  category.isActive = true;
  category.createdAt = faker.date.recent();
  category.updatedAt = faker.date.recent();
  return category;
});

define(Post, (faker: typeof fakerStatic) => {
  const post = new Post();
  post.title = faker.lorem.sentence();
  post.category = 1;
  post.user = 1;
  post.body = faker.lorem.paragraphs(3);
  post.description = faker.lorem.paragraph(1);
  post.createdAt = faker.date.recent();
  post.updatedAt = faker.date.recent();
  return post;
});

define(User, (faker: typeof fakerStatic) => {
  const gender = faker.random.number(1);
  const firstName = faker.name.firstName(gender);
  const lastName = faker.name.lastName(gender);

  const user = new User();
  user.name = `${firstName} ${lastName}`;
  user.email = faker.internet.email();
  return user;
});
