'use strict';

var NwBuilder = require('node-webkit-builder');
var gulp = require('gulp');
var gutil = require('gulp-util');

gulp.task('default', function () {

	var nw = new NwBuilder({
		version: '0.11.6',
		files: [ './**'],
		macIcns: './public/img/icon.icns',
		winIco: './public/img/icon.ico',
		platforms: ['osx64'] // change this to 'win' for/on windows
	});

	// Log stuff you want
	nw.on('log', function (msg) {
		gutil.log('node-webkit-builder:', msg);
	});

	// Build returns a promise, return it so the task isn't called in parallel
	return nw.build().catch(function (err) {
		gutil.log('error:', err);
	});

});
