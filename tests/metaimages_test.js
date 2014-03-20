'use strict';

var chai = require('chai');
var expect = chai.expect;

// Module for finding the dimensions of an image
var sizeOf = require('image-size');

var requireHelper = require('./require_helper');

// The metaimages module
var metaimages = requireHelper('metaimages');


//Begin tests
///////////////////////////////////////////////////////

describe('metaimages', function(){

	it('should exist', function(){
		expect(metaimages).to.exist;
	});


	describe('create() method', function(){
		var mi = metaimages();


		it('should callback error for invalid source image', function(done){

			mi.create("tests/images/FAKENAME.png", "tests/tmp/", function(err, files){
				expect(err).to.deep.equal( new Error('Image file "tests/images/FAKENAME.png" not found.') );

				done();
			});

		});

		it('callback array of filepaths', function(done){

			mi.create("tests/images/test1.png", "tests/tmp/", function(err, files){
				expect(files).to.deep.equal( [
					"tests/tmp/twitter_test1.jpg",
					"tests/tmp/facebook_small_test1.jpg",
					"tests/tmp/gplus_test1.jpg",
					"tests/tmp/facebook_large_test1.jpg"
				] );

				done();
			});

		});



		it('should create correct image sizes for square images', function(done){

			mi.create("tests/images/3000x3000.png", "tests/tmp/", function(err, files){
				checkImageSizes('3000x3000.jpg');

				done();
			});

		});

		it('should create correct image sizes for tall images', function(done){

			mi.create("tests/images/1500x3000.png", "tests/tmp/", function(err, files){
				checkImageSizes('1500x3000.jpg');

				done();
			});

		});

		it('should create correct image sizes for wide images', function(done){

			mi.create("tests/images/3000x1500.png", "tests/tmp/", function(err, files){
				checkImageSizes('3000x1500.jpg');

				done();
			});

		});

	});

});



// Goes through all the default image sizes
function checkImageSizes( image ){
	var dimensions = sizeOf('tests/tmp/twitter_'+image);
	expect(dimensions.width).to.equal(250);
	expect(dimensions.height).to.equal(250);

	var dimensions = sizeOf('tests/tmp/facebook_small_'+image);
	expect(dimensions.width).to.equal(600);
	expect(dimensions.height).to.equal(315);

	var dimensions = sizeOf('tests/tmp/facebook_large_'+image);
	expect(dimensions.width).to.equal(1200);
	expect(dimensions.height).to.equal(630);

	var dimensions = sizeOf('tests/tmp/gplus_'+image);
	expect(dimensions.width).to.equal(800);
	expect(dimensions.height).to.equal(800);
}