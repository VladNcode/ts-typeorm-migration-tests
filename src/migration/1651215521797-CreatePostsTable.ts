import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePostsTable1651215521797 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
				CREATE TABLE posts (
				id SERIAL PRIMARY KEY,
				url VARCHAR(300),
				lat NUMERIC,
				LNG NUMERIC
			);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE posts;`);
  }
}
