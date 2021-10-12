import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnIsActiveToRoute1634013678065
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'route',
      new TableColumn({
        name: 'isActive',
        type: 'boolean',
        default: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropColumn('route', 'isActive');
  }
}
