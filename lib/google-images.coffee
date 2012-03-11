request = require 'request'
fs = require 'fs'

exports.searchPages = searchPages = (query, num_pages, callback, images = [], page_num = 0) ->
	url = 'http://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=' + query.replace(/\s/g, '+')
	if page_num > 0
		start_index = images.length
		url = "#{url}&start=#{start_index}"
	request url, (err, res, body) ->
		response_data = JSON.parse(body).responseData
		console.log(response_data)
		items = response_data.results
		console.log(items)
		for item in items
			images.push
				width: item.width
				height: item.height
				unescapedUrl: item.unescapedUrl
				url: item.url
				writeTo: (path, callback) ->
					stream = fs.createWriteStream path
					stream.on 'close', ->
						callback()
					request(item.url).pipe stream
		if (page_num + 1) < num_pages
			searchPages query, num_pages, callback, images, page_num + 1
		else
			callback images

exports.search = search = (query, callback) ->
	searchPages query, 1, callback

