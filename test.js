'use strict';

/**
 * Dependencies
 */

const test = require('ava');
const http = require('http');
const qs = require('querystring');

const googleImages = require('./');


/**
 * Tests
 */

test('query', async t => {
	let client = testClient('id', 'api');
	let server = testServer();

	let query = qs.stringify({
		q: 'steve+angello',
		searchType: 'image',
		cx: 'id',
		key: 'api'
	});

	server.on('/customsearch/v1?' + query, (req, res) => {
		res.end(fakeResponse());
		server.close();
	});

	let images = await client.search('steve angello');
	t.same(images, fakeImages());
});

test('page option', async t => {
	let client = testClient('id', 'api');
	let server = testServer();

	let query = qs.stringify({
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

	let images = await client.search('steve angello', {
		page: 1
	});

	t.same(images, fakeImages());
});

test('size option', async t => {
	let client = testClient('id', 'api');
	let server = testServer();

	let query = qs.stringify({
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

	let images = await client.search('steve angello', {
		size: 'large'
	});

	t.same(images, fakeImages());
});


/**
 * Helpers
 */

function testClient (id, apiKey) {
	let client = googleImages(id, apiKey);
	client.endpoint = 'http://localhost:9999';

	return client;
}

function testServer () {
	let server = http.createServer(function (req, res) {
		server.emit(req.url, req, res);
	});

	server.listen(9999);

	return server;
}

function fakeResponse () {
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

function fakeImages () {
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
