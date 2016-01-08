**Deprecation Notice**: Google Image Search API is no longer working and so is this module, as a consequence. This module served well for 4 years and it's sad to see it not working anoymore, but life is life, time to move on. I recommend using Flickr API and  [flickrapi](https://www.npmjs.com/package/flickrapi) module from now on.

# google-images

This module for Node.js helps searching images using Google Images. It provides just one method, *search*, don't you need just that?

# Installation
Install from NPM:

```npm install google-images```

# Usage

## Setup Google Custom Search Engine

First you'll need to create your own Google Custom Search Engine. You can do this here: [https://cse.google.com/cse](https://cse.google.com/cse).

Do not specify any sites to search but instead use the _Restrict Pages using Schema.org Types" under the advanced option. For the most inclusive set, use the Schema: `Thing`. Make a note of the CSE ID.

Then you'll need to setup the CSE API in the [Google Developers Console](https://console.developers.google.com). Make a note of the API key.

You'll need to use the CSE ID and API key in the request. Examples below"

```
client = require 'google-images'	

client.search for: 'Michael Jackson', cse_id: xxxx, cse_api_key: xxxx, callback: (err, images) ->
	image.writeTo 'path_to_image.extension', -> # image saved to the disk

client.search for: 'Michael Jackson', page: 2, cse_id: xxxx, cse_api_key: xxxx callback: (err, images) ->

client.search 'Michael Jackson', page: 2, cse_id: xxxx, cse_api_key: xxxx, callback: (err, images) ->

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
