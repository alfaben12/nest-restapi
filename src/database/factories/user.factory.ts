import Faker from 'faker';
import { User } from 'src/users/entities/user.entity';
import { define } from 'typeorm-seeding';

define(User, (faker: typeof Faker) => {
  const gender = faker.random.number(1);
  const firstName = faker.name.firstName(gender);
  const lastName = faker.name.lastName(gender);

  const user = new User();
  user.name = `${firstName} ${lastName}`;
  user.email = faker.internet.email();
  user.uuid = faker.random.uuid();
  user.password = faker.internet.password();
  return user;
});
