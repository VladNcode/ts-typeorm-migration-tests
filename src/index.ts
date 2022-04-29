import { AppDataSource } from './data-source';
import express, { Request, Response } from 'express';

const app = express();

AppDataSource.initialize()
	.then(async () => {
		const res = await AppDataSource.query(
			`
			SELECT 1 + 1;
			`,
		);

		console.log(res);

		app.use(express.json({ limit: '10kb' }));
		app.use(express.urlencoded({ extended: true }));

		app.get('/', (req: Request, res: Response) => {
			res.send('Hello World!');
		});

		app.get('/posts', async (req: Request, res: Response) => {
			const posts = await AppDataSource.query(
				`
				SELECT * FROM posts;
				`,
			);

			// res.status(200).json({ status: "success", data: posts });

			res.send(`
				<table>
					<thead>
						<tr>
							<th>id</th>
							<th>lat</th>
							<th>lng</th>
						</tr>
					</thead>
					<tbody>
					${posts
						.map(
							({
								id,
								loc: { x: lat },
								loc: { y: lng },
							}: {
								id: string;
								loc: { x: number; y: number };
							}) => `
					<tr>
						<td>${id}</td>
						<td>${lat}</td>
						<td>${lng}</td>
					</tr>
					`,
						)
						.join('')}
					</tbody>
				</table>


				<form method="POST">
					<h3>Create Comment</h3>
					<div>
						<label>Lat</label>
						<input name="lat"/>
					</div>

					<div>
						<label>Lng</label>
						<input name="lng"/>
					</div>
					<button type="submit">Create</button>
				</form>
			`);
		});

		app.post('/posts', async (req: Request, res: Response) => {
			const { lat, lng } = req.body;
			const loc = `(${lat},${lng})`;

			await AppDataSource.query('INSERT INTO posts (loc) VALUES ($1);', [loc]);

			res.redirect('/posts');
		});

		app.listen(3000, () => {
			console.log(`App is listening on 3000...`);
		});
	})
	.catch(error => console.log(error));
