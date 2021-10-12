import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnRoleToUser1634006678789 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'role',
        type: 'enum',
        enum: ['ADMIN', 'OPERATION', 'TRAFFIC'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropColumn('user', 'role');
  }
}
