import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnIsActiveToCategory1633402251017
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'category',
      new TableColumn({
        name: 'isActive',
        type: 'boolean',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropColumn('category', 'isActive');
  }
}
