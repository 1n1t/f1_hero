const f = require('../../jest/utils/factories');
const h = require('../../jest/utils/helper');

beforeAll(async done => {
	await h.beforeAll();
	done();
});

afterAll(async done => {
	await h.afterAll();
	done();
});

beforeEach(async done => {
	await h.beforeEach();
	done();
});

test('user can fetch all races in the season', async () => {
	h.signIn();
	await f.create('race');
	await f.create('race');
	const response = await h.api.get('/races').then(res => res.data.races);

	expect(response).toHaveLength(2);
});

test('unauthenticated user cannot get races info', async () => {
	await f.create('race');
	const error = await h.api.get('/races').catch(err => err.response);

	expect(error.status).toBe(401);
});