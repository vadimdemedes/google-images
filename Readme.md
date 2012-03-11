# google-images

This module for Node.js helps searching images using Google Images. It
provides two functions - `search` and `searchPages`. `search` returns
a single page of results (4 images). `searchPages` takes an extra
parameter for the number of search result pages you want.

# Installation
Install from NPM:

```npm install google-images```

# Usage

```
googleImages = require('google-images');

googleImages.search('Katy Perry', function(results){
	// let's say we want to save first image to a file

	results[0].writeTo('katy.png', function(){
		// this function fires when file write op completed

		console.log('finished');
	});
});

// If you want to fetch 5 pages of results, use the searchPages function
googleImages.searchPages('Katy Perry', 5, function(results){
        // results should be an array of 20 image objects
        console.log(results);
});
```

# License

(The MIT License)

Copyright (c) 2011 Vadim Demedes &lt;sbioko@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
