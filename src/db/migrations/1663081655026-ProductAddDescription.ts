import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductAddDescription1663081655026 implements MigrationInterface {
  name = 'ProductAddDescription1663081655026';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD \`description_backup\` text NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP COLUMN \`description_backup\``,
    );
  }
}
