import { AppDataSource } from '../../data-source';

export const lngLatToLoc = async function () {
	try {
		await AppDataSource.query(
			`
			UPDATE posts
			SET loc = POINT(lng, lat)
			WHERE loc IS NULL;
			`,
		);

		console.log('Update complete');
	} catch (e) {
		console.error(e);
	}
};
