import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLocColumn1651221028150 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			ALTER TABLE posts 
			ADD COLUMN loc POINT;
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			ALTER TABLE posts 
			DROP COLUMN loc;
		`);
	}
}
