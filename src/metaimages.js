/*
 * metaimages.js
 * https://github.com/traviswimer/metaimages.js
 *
 * Copyright (c) 2014 Travis Wimer
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');	// file system
var deepExtend = require('deep-extend');	// Allows object properties to be overridden
var resizeCrop = require('resize-crop');	// Resizes and crops images to correct size

module.exports = function( options ) {

	// Default config
	var config = {
		format: "jpg",
		gravity: "center",
		images: {
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
				'height': 1200,
				'width': 630,
				'maxBytes': 5242880 // 5MB
			},
			gplus: {
				"prefix": "gplus_",
				'height': 800, // Google doesn't specify dimensions, so it will be 800 until someone yells at me.
				'width': 800
			}
		}
	};


	// Override defaults with supplied options
	deepExtend(config, options);


	function create( src, dest, callback ){

		var imagesToProcess = Object.keys( config.images ).length;
		var imagesProcessed = 0;

		var conversionFinished = function(){
			imagesProcessed++;
			if( imagesProcessed >= imagesToProcess ){
				callback(null, successfulConversions);
			}
		}


		// make sure specified image exists
		if( !fs.existsSync(src) ){
			callback( new Error('Image file "' + src + '" not found.') );
		}else{

			// Cycle through each social media type
			for( var type in config.images ){

				var img = config.images[type];

				var filename = filepath.replace(/^.*[\\\/]/, '');
				filename = (filename.split("."))[0];

				var format = img.format || config.format;
				var gravity = img.gravity || config.gravity;


				resizeCrop(
					{
						format: format,
						src: src,
						dest: dest + '/' + filename + '.' + format,
						height: img.height,
						width: img.width,
						gravity: gravity
					}, 
					function( err, filePath ){
						successfulConversions.push(filePath);
						conversionFinished();
					}
				);
			}


		}

	}

	return {
		create: create
	}


};
