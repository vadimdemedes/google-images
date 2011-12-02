
module.exports = require('./lib/google-images');

var search = require('./lib/google-images');

search.search('Katy Perry', function(results){
	results[0].writeTo('test.png', function(){
		console.log('finished');
	});
});