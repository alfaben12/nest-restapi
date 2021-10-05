import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddForeignPostToUser1633404103690 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'post',
      new TableColumn({
        name: 'userId',
        type: 'int',
      }),
    );

    await queryRunner.createForeignKey(
      'post',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
        name: 'PostUserIdForeign',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('post');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('userId') !== -1,
    );
    await queryRunner.dropForeignKey('post', foreignKey);
    queryRunner.dropColumn('post', 'userId');
  }
}
