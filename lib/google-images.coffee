request = require 'request'
fs = require 'fs'

generateInfo = (item) ->
  info = 
		width: item.width
		height: item.height
		unescapedUrl: item.unescapedUrl
		url: item.url
		writeTo: (path, callback) ->
			stream = fs.createWriteStream path
			stream.on 'close', ->
				callback?()
			request(item.url).pipe stream
  return info

exports.search = (query, options) ->
	if typeof query is 'object'
		options = query
		query = options.for
		callback = options.callback if options.callback?
	if typeof query is 'string' and typeof options is 'function'
		callback = options
		options = {}
	if typeof query is 'string' and typeof options is 'object'
		callback = options.callback if options.callback?
	
	options.page = 0 if not options.page?
	
	request "http://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=#{ encodeURIComponent(query.replace(/\s/g, '+')) }&start=#{ options.page }", (err, res, body) ->
		try
			data = JSON.parse(body)
		catch error
			callback no, [] if callback
			return

		if not data.responseData or not data.responseData.results
			callback no, [] if callback
			return

		items = data.responseData.results

		images = []
		for item in items
      images.push generateInfo item
		
		callback no, images if callback