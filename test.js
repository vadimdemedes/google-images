'use strict';

const http = require('http');
const qs = require('querystring');
const test = require('ava');

const ImagesClient = require('./');

test('query', async t => {
	const client = testClient('id', 'api');
	const server = testServer();

	const query = qs.stringify({
		q: 'steve+angello',
		searchType: 'image',
		cx: 'id',
		key: 'api'
	});

	server.on('/customsearch/v1?' + query, (req, res) => {
		res.end(fakeResponse());
		server.close();
	});

	const images = await client.search('steve angello');
	t.deepEqual(images, fakeImages());
});

test('page option', async t => {
	const client = testClient('id', 'api');
	const server = testServer();

	const query = qs.stringify({
		q: 'steve+angello',
		searchType: 'image',
		cx: 'id',
		key: 'api',
		start: 1
	});

	server.on('/customsearch/v1?' + query, (req, res) => {
		res.end(fakeResponse());
		server.close();
	});

	const images = await client.search('steve angello', {
		page: 1
	});

	t.deepEqual(images, fakeImages());
});

test('size option', async t => {
	const client = testClient('id', 'api');
	const server = testServer();

	const query = qs.stringify({
		q: 'steve+angello',
		searchType: 'image',
		cx: 'id',
		key: 'api',
		imgSize: 'large'
	});

	server.on('/customsearch/v1?' + query, (req, res) => {
		res.end(fakeResponse());
		server.close();
	});

	const images = await client.search('steve angello', {
		size: 'large'
	});

	t.deepEqual(images, fakeImages());
});

function testClient(id, apiKey) {
	const client = new ImagesClient(id, apiKey);
	client.endpoint = 'http://localhost:9999';

	return client;
}

function testServer() {
	const server = http.createServer(function (req, res) {
		server.emit(req.url, req, res);
	});

	server.listen(9999);

	return server;
}

function fakeResponse() {
	return JSON.stringify({
		items: [{
			link: 'http://steveangello.com/boss.jpg',
			mime: 'image/jpeg',
			image: {
				width: 1024,
				height: 768,
				byteSize: 1000,
				thumbnailLink: 'http://steveangello.com/thumbboss.jpg',
				thumbnailWidth: 512,
				thumbnailHeight: 512
			}
		}]
	});
}

function fakeImages() {
	return [{
		url: 'http://steveangello.com/boss.jpg',
		type: 'image/jpeg',
		width: 1024,
		height: 768,
		size: 1000,
		thumbnail: {
			url: 'http://steveangello.com/thumbboss.jpg',
			width: 512,
			height: 512
		}
	}];
}
