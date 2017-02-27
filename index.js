'use strict';

const qs = require('querystring');
const got = require('got');

class Client {
	constructor(id, apiKey) {
		if (!id) {
			throw new TypeError('Expected a Custom Search Engine ID');
		}

		if (!apiKey) {
			throw new TypeError('Expected an API key');
		}

		this.endpoint = 'https://www.googleapis.com';
		this.apiKey = apiKey;
		this.id = id;
	}

	search(query, options) {
		if (!query) {
			throw new TypeError('Expected a query');
		}

		const url = `${this.endpoint}/customsearch/v1?${this.buildQuery(query, options)}`;

		return got(url, {json: true}).then(res => {
			const items = res.body.items || [];

			return items.map(item => ({
				type: item.mime,
				width: item.image.width,
				height: item.image.height,
				size: item.image.byteSize,
				url: item.link,
				thumbnail: {
					url: item.image.thumbnailLink,
					width: item.image.thumbnailWidth,
					height: item.image.thumbnailHeight
				},
				description: item.snippet,
				parentPage: item.image.contextLink
			}));
		});
	}

	buildQuery(query, options) {
		options = options || {};

		const result = {
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
}

module.exports = Client;
