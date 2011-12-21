'use strict';

var resolve    = require('path').resolve
  , contains   = require('es5-ext/lib/List/contains').call
  , endsWith   = require('es5-ext/lib/String/ends-with').call
  , ba2p       = require('deferred/lib/async-to-promise').bind
  , all        = require('deferred/lib/join/all')
  , copy       = ba2p(require('next/lib/fs/copy'))
  , fileExists = ba2p(require('next/lib/fs/file-exists'))
  , readdir    = ba2p(require('next/lib/fs/readdir-files-deep'))

  , root = resolve(__dirname, '../../')
  , settingsDir = root + '/settings';

require('deferred/lib/ext/all');

module.exports = function () {
	return all(
		fileExists(root + '/config.js')
		(function (exists) {
			if (exists) {
				return null;
			}
			console.log("Setup: config.js");
			return copy(root + '/config.default.js', root + '/config.js');
		}),
		readdir(settingsDir).all(function (name, index, list) {
			var tname;
			if (endsWith(name, '.default.js') &&
				 !contains(list, tname = name.slice(0, -('default.js'.length)) + 'js')) {
				console.log("Setup settings: " + tname);
				return copy(settingsDir + '/' + name, settingsDir + '/' + tname);
			}
		}));
};
