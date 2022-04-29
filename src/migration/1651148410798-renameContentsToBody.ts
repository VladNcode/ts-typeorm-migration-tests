import { MigrationInterface, QueryRunner } from "typeorm";

export class renameContentsToBody1651148410798 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
		ALTER TABLE comments
		RENAME COLUMN contents TO body
		;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
		ALTER TABLE comments
		RENAME COLUMN body TO contents
		;`);
  }
}
