# metaimages.js [![Build Status](https://travis-ci.org/traviswimer/metaimages.js.svg?branch=master)](https://travis-ci.org/traviswimer/metaimages.js) [![Coverage Status](https://coveralls.io/repos/traviswimer/metaimages.js/badge.png)](https://coveralls.io/r/traviswimer/metaimages.js)

> Create correctly sized images for use in social media meta tags.

## Installation

```shell
npm install metaimages
```
## Basic Example

```javascript
var metaimages = require('metaimages');

var metaImg = metaimages();
metaImg.create(
	"your/image/to/convert.png",
	"output/directory/for/images", 
	function(err, files){
		if(!err){
			// do something
		}
	}
);
```
## Advanced Example

```javascript
var metaimages = require('metaimages');

var metaImg = metaimages({
	format: "png",
	gravity: "center",
	images: {
		twitter: {
			'maxBytes': 5242880
		},
		facebook_small: {
			"prefix": "facebook_tiny_",
			'gravity': 'north'
		},
		facebook_large: {
			"prefix": "facebook_huge_",
			'height': 800,
			'width': 1500
		},
		gplus: false,
		otherSocialMediaSite: {
			"prefix": "something_",
			'height': 620, 
			'width': 300
		}
	}
});
metaImg.create(
	"your/image/to/convert.png",
	"output/directory/for/images", 
	function(err, files){
		if(!err){
			// do something
		}
	}
);
```

## Options


### options.format

* Type: `String`
* Default: `"jpg"`
* Description: Sets the image type to output. Supporst any image format supported by [imagemagick](https://github.com/rsms/node-imagemagick)

### options.gravity

* Type: `String`
* Default: `"center"`
* Description: Determines the part of the image that will be removed during cropping. For example, `"center"` will try to keep the centermost part of the image and only remove the furthest edges.

### options.images

* Type: `object`
* Description: Set a property for each image you want to create. There are 4 default images with customizable properties and can also be removed by setting them to `false`:
	* twitter
	* facebook_small
	* facebook_large
	* gplus
* Default:
```javascript
{
	twitter: {
		"prefix": "twitter_",
		'height': 250,
		'width': 250,
		'maxBytes': 1048576 // 1MB
	},
	facebook_small: {
		"prefix": "facebook_small_",
		'height': 315,
		'width': 600,
		'maxBytes': 5242880 // 5MB
	},
	facebook_large: {
		"prefix": "facebook_large_",
		'height': 630,
		'width': 1200,
		'maxBytes': 5242880 // 5MB
	},
	gplus: {
		"prefix": "gplus_",
		'height': 800, // Google doesn't specify dimensions, so it will be 800 until someone yells at me.
		'width': 800
	}
}
```



### create( sourceImage, outputDirectory, callback( error, filesArray ) )


#### sourceImage - *REQUIRED PARAMETER*

* Type: `String`
* Description: Sets the source image to be used to render the social media images.

#### outputDirectory - *REQUIRED PARAMETER*

* Type: `String`
* Description: Sets the directory to where the rendered social media images will be saved.

#### callback( error, filesArray )

* Type: `function`
* Description: function that is called once image creation is complete.
* Parameters:
	* **error** - An error object
	* **filesArray** - An array of the file paths of created images

