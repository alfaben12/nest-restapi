import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnRoleToRoute1634012493102 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'route',
      new TableColumn({
        name: 'role',
        type: 'text',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropColumn('route', 'role');
  }
}
