'use strict';

import nock from 'nock';
import test from 'ava';
import Client from './index.js';

const fakeResponse = JSON.stringify({
	items: [{
		link: 'http://steveangello.com/boss.jpg',
		mime: 'image/jpeg',
		snippet: 'Steve Angello',
		image: {
			contextLink: 'http://steveangello.com',
			width: 1024,
			height: 768,
			byteSize: 1000,
			thumbnailLink: 'http://steveangello.com/thumbboss.jpg',
			thumbnailWidth: 512,
			thumbnailHeight: 512
		}
	}]
});

const fakeImages = [{
	link: 'http://steveangello.com/boss.jpg',
	mime: 'image/jpeg',
	snippet: 'Steve Angello',
	image: {
		contextLink: 'http://steveangello.com',
		width: 1024,
		height: 768,
		byteSize: 1000,
		thumbnailLink: 'http://steveangello.com/thumbboss.jpg',
		thumbnailWidth: 512,
		thumbnailHeight: 512
	}
}];

test('fail when cse id is missing', t => {
	t.throws(() => { new Client(); }, undefined, 'Expected a Custom Search Engine ID');
}
);

test('fail when api key is missing', t => {
	t.throws(() => { new Client('id'); }, undefined, 'Expected an API key');
}
);

test('fail when query is missing', async t => {
	const client = new Client('id', 'api');
	await t.throwsAsync(client.search(), undefined, 'Expected a query');
}
);

test('no results', async t => {
	const client = new Client('id', 'api');

	const req = nock('https://www.googleapis.com')
		.get('/customsearch/v1')
		.query({
			q: 'somethingmadeup',
			searchType: 'image',
			cx: 'id',
			key: 'api'
		})
		.reply(200, { items: [] });

	const images = await client.search('somethingmadeup');
	t.deepEqual(images, []);
	t.true(req.isDone());
});

test('query', async t => {
	const client = new Client('id', 'api');

	const req = nock('https://www.googleapis.com')
		.get('/customsearch/v1')
		.query({
			q: 'steve+angello',
			searchType: 'image',
			cx: 'id',
			key: 'api'
		})
		.reply(200, fakeResponse);

	const images = await client.search('steve angello');
	t.deepEqual(images, fakeImages);
	t.true(req.isDone());
});

test('page option', async t => {
	const client = new Client('id', 'api');

	const req = nock('https://www.googleapis.com')
		.get('/customsearch/v1')
		.query({
			q: 'steve+angello',
			searchType: 'image',
			cx: 'id',
			key: 'api',
			start: 1
		})
		.reply(200, fakeResponse);

	const images = await client.search('steve angello', { page: 1 });
	t.deepEqual(images, fakeImages);
	t.true(req.isDone());
});

test('size option', async t => {
	const client = new Client('id', 'api');

	const req = nock('https://www.googleapis.com')
		.get('/customsearch/v1')
		.query({
			q: 'steve+angello',
			searchType: 'image',
			cx: 'id',
			key: 'api',
			imgSize: 'large'
		})
		.reply(200, fakeResponse);

	const images = await client.search('steve angello', { size: 'large' });
	t.deepEqual(images, fakeImages);
	t.true(req.isDone());
});

test('type option', async t => {
	const client = new Client('id', 'api');

	const req = nock('https://www.googleapis.com')
		.get('/customsearch/v1')
		.query({
			q: 'steve+angello',
			searchType: 'image',
			cx: 'id',
			key: 'api',
			imgType: 'clipart'
		})
		.reply(200, fakeResponse);

	const images = await client.search('steve angello', { type: 'clipart' });
	t.deepEqual(images, fakeImages);
	t.true(req.isDone());
});

test('dominant color option', async t => {
	const client = new Client('id', 'api');

	const req = nock('https://www.googleapis.com')
		.get('/customsearch/v1')
		.query({
			q: 'steve+angello',
			searchType: 'image',
			cx: 'id',
			key: 'api',
			imgDominantColor: 'green'
		})
		.reply(200, fakeResponse);

	const images = await client.search('steve angello', { dominantColor: 'green' });
	t.deepEqual(images, fakeImages);
	t.true(req.isDone());
});

test('color type option', async t => {
	const client = new Client('id', 'api');

	const req = nock('https://www.googleapis.com')
		.get('/customsearch/v1')
		.query({
			q: 'steve+angello',
			searchType: 'image',
			cx: 'id',
			key: 'api',
			imgColorType: 'gray'
		})
		.reply(200, fakeResponse);

	const images = await client.search('steve angello', { colorType: 'gray' });
	t.deepEqual(images, fakeImages);
	t.true(req.isDone());
});

test('safe option', async t => {
	const client = new Client('id', 'api');

	const req = nock('https://www.googleapis.com')
		.get('/customsearch/v1')
		.query({
			q: 'steve+angello',
			searchType: 'image',
			cx: 'id',
			key: 'api',
			safe: 'medium'
		})
		.reply(200, fakeResponse);

	const images = await client.search('steve angello', { safe: 'medium' });
	t.deepEqual(images, fakeImages);
	t.true(req.isDone());
});