import { MigrationInterface, QueryRunner } from 'typeorm';

export class removeLatLng1651223655391 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			ALTER TABLE posts 
			DROP COLUMN lat,
			DROP COLUMN lng;
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			ALTER TABLE posts 
			ADD COLUMN lat NUMERIC,
			ADD COLUMN lng NUMERIC;
		`);
	}
}
