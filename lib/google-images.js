(function() {
  var fs, request, search, searchPages;

  request = require('request');

  fs = require('fs');

  exports.searchPages = searchPages = function(query, num_pages, callback, images, page_num) {
    var start_index, url;
    if (images == null) images = [];
    if (page_num == null) page_num = 0;
    url = 'http://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=' + query.replace(/\s/g, '+');
    if (page_num > 0) {
      start_index = images.length;
      url = "" + url + "&start=" + start_index;
    }
    return request(url, function(err, res, body) {
      var item, items, response_data, _i, _len;
      response_data = JSON.parse(body).responseData;
      items = response_data.results;
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
      if ((page_num + 1) < num_pages) {
        return searchPages(query, num_pages, callback, images, page_num + 1);
      } else {
        return callback(images);
      }
    });
  };

  exports.search = search = function(query, callback) {
    return searchPages(query, 1, callback);
  };

}).call(this);
