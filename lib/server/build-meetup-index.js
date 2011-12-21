'use strict';

var keys       = Object.keys
  , stringify  = JSON.stringify
  , fs         = require('fs')
  , resolve    = require('path').resolve
  , startsWith = require('es5-ext/lib/String/starts-with').call
  , ba2p       = require('deferred/lib/async-to-promise').bind
  , all        = require('deferred/lib/join/all')

  , path = resolve(__dirname, '../../settings/meetups')
  , imagesPath = resolve(__dirname, '../../public/i/events')
  , readdir = ba2p(fs.readdir)
  , writeFile = ba2p(fs.writeFile, resolve(path + '/index.js'));

require('deferred/lib/ext/invoke');

module.exports = function () {
	return all(
		readdir(path).invoke('filter', function (file) {
			return (file.slice(-3) === '.js') && (file !== 'index.js');
		}).invoke('map', function (file) {
			return file.slice(0, -3);
		}),
		readdir(imagesPath).invoke('filter', function (file) {
			return (file.slice(-4) === '.jpg')
		})
		(function (files) {
			var r = {};
			files.forEach(function (name) {
				r[name.slice(0, -4)] = true;
			});
			return r;
		}))
	(function (data) {
		var files, images;
		files = data[0];
		images = data[1];
		return writeFile('\'use strict\';\n\nexports = module.exports = {\n\t' +
			files.map(function (file) {
				return stringify(file) + ': require(\"./' + file + '")';
			}).join(',\n\t') + '\n};\n\n' + files.map(function (file) {
				file = stringify(file);
				return 'exports[' + file +'].id = exports[' + file + '].uri = ' + file;
			}).join(";\n") + ';\n\n' + files.map(function (file) {
				var index = 0;
				while (images[file + '.' + (index + 1)]) ++index;
				return 'exports[' + stringify(file) +'].imagesCount = ' + index;
			}).join(";\n") + ";\n\n" + files.map(function (file) {
				var limages = [];
				keys(images).forEach(function (img) {
					var match, re;
					if ((match = img.match(
						re = new RegExp('^' + file + '\\.prelegent\\.([a-z0-9A-Z]+)$')))) {
						limages.push(stringify(match[1]));
					}
				});
				return 'exports[' + stringify(file) +'].lectureImages = [' +
					limages + ']';
			}).join(";\n") + ";\n");
	});
};
