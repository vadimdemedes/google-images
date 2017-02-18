'use strict';

const qs = require('querystring');
const got = require('got');

class Client {
	constructor(id, apiKey) {
		this.endpoint = 'https://www.googleapis.com';
		this.apiKey = apiKey;
		this.id = id;
	}

	search(query, options) {
		if (!query) {
			throw new TypeError('Expected a query');
		}

		return got(this.endpoint + '/customsearch/v1?' + this._buildOptions(query, options), {
			json: true
		}).then(this._buildResponse);
	}

	_buildOptions(query, options) {
		if (!options) {
			options = {};
		}

		var result = {
			q: query.replace(/\s/g, '+'),
			searchType: 'image',
			cx: this.id,
			key: this.apiKey
		};

		if (options.page) {
			result.start = options.page;
		}

		if (options.size) {
			result.imgSize = options.size;
		}

		if (options.type) {
			result.imgType = options.type;
		}

		if (options.dominantColor) {
			result.imgDominantColor = options.dominantColor;
		}

		if (options.colorType) {
			result.imgColorType = options.colorType;
		}

		if (options.safe) {
			result.safe = options.safe;
		}

		return qs.stringify(result);
	}

	_buildResponse(res) {
		return (res.body.items || []).map(function (item) {
			return item;
		});
	}
}

module.exports = Client;
