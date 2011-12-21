'use strict';

var stringify = JSON.stringify
  , fs        = require('fs')
  , path      = require('path')
  , remove    = require('es5-ext/lib/Array/remove').call
  , all       = require('deferred/lib/join/all')
  , ba2p      = require('deferred/lib/async-to-promise').bind
  , readdir   = ba2p(require('next/lib/fs/readdir-files-deep'))

  , resolve = path.resolve, basename = path.basename
  , readFile = ba2p(fs.readFile), writeFile = ba2p(fs.writeFile)

  , root = resolve(__dirname, '../../')
  , publicDir = root + '/public';

require('deferred/lib/ext/invoke');
require('deferred/lib/ext/match');

module.exports = function () {
	return all(
		readdir(publicDir).invoke('filter', function (filename) {
			var base = basename(filename)
			return (base[0] !== '.') && (base !== filename);
		}),
		readFile(publicDir + '/offline.appcache.tpl', 'utf-8')
	).match(function (files, template) {
		return writeFile(publicDir + '/offline.appcache',
			template.replace('$VERSION', stringify(new Date).slice(1, -1))
			.replace('$STATICS', '/' + files.join('\n/')));
	});
};
