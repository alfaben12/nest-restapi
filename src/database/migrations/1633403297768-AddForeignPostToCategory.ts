import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddForeignPostToCategory1633403297768
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'post',
      new TableColumn({
        name: 'categoryId',
        type: 'int',
      }),
    );

    await queryRunner.createForeignKey(
      'post',
      new TableForeignKey({
        columnNames: ['categoryId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'category',
        onDelete: 'CASCADE',
        name: 'PostCategoryIdForeign',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('post');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('categoryId') !== -1,
    );
    await queryRunner.dropForeignKey('post', foreignKey);
    queryRunner.dropColumn('post', 'categoryId');
  }
}
