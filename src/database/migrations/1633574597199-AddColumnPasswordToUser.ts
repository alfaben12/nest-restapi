import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnPasswordToUser1633574597199
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'password',
        type: 'text',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropColumn('user', 'password');
  }
}
