import { User } from 'src/users/entities/user.entity';
import { Connection } from 'typeorm';
import { Seeder, Factory } from 'typeorm-seeding';

export default class CreateUser implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([{ name: 'Timber', email: 'alfa@gmail.com' }])
      .execute();
  }
}
