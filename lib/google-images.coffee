request = require 'request'
fs = require 'fs'

class GoogleImages
	
	search: (query, callback) ->
		return callback [] if not query
		
		request 'http://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=' + query.replace(/\s+/, '+'), (err, res, body) ->
			items = JSON.parse(body).responseData.results
			images = []
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
			
			callback images


module.exports = new GoogleImages