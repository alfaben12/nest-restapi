import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnMethodToRoute1634012118517 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'route',
      new TableColumn({
        name: 'method',
        type: 'text',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropColumn('route', 'method');
  }
}
