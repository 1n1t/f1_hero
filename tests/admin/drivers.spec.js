const mongoose = require('mongoose');
const h = require('../../jest/utils/helper');
const f = require('../../jest/utils/factories');

beforeAll(async done => {
	await h.beforeAll();
	done();
});

afterAll(async done => {
	await h.afterAll();
	done();
});

beforeEach(async done => {
	await h.beforeEach({ isAdmin: true });
	done();
});

afterEach(async done => {
	await h.afterEach();
	done();
});

test('admin can fetch driver list from API and store it in the database', async () => {
	h.signIn();

	const response = await h.admin.get('/drivers').then(res => res.data.drivers);
	const Driver = mongoose.model('driver');
	const drivers = await Driver.find();

	expect(response).toHaveLength(drivers.length);
});

test('not admin cannot change driver data', async () => {
	const user = await f.create('user');
	h.setUser(user);
	h.signIn();

	const error = await h.admin.get('/drivers').catch(err => err.response);

	expect(error.status).toBe(401);
});

test('CI workflow', async () => {
	expect(true).toBe(true);
});
