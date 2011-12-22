var fs, request;
request = require('request');
fs = require('fs');
module.exports = {
  search: function(query, callback) {
    if (!query) {
      return callback([]);
    }
    return request('http://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=' + query.replace(/\s/g, '+'), function(err, res, body) {
      var images, item, items, _i, _len;
      items = JSON.parse(body).responseData.results;
      images = [];
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        images.push({
          width: item.width,
          height: item.height,
          unescapedUrl: item.unescapedUrl,
          url: item.url,
          writeTo: function(path, callback) {
            var stream;
            stream = fs.createWriteStream(path);
            stream.on('close', function() {
              return callback();
            });
            return request(item.url).pipe(stream);
          }
        });
      }
      if (callback) {
        return callback(images);
      }
    });
  }
};