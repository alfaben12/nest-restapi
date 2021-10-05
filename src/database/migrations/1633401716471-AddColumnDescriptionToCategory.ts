import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnDescriptionToCategory1633401716471
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'category',
      new TableColumn({
        name: 'description',
        type: 'text',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropColumn('category', 'description');
  }
}
