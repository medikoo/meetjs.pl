'use strict';

var path             = require('path')
  , lock             = require('es5-ext/lib/Function/lock').call
  , format           = require('es5-ext/lib/Date/format')('%m-%d %H:%M:%S').call
  , ba2p             = require('deferred/lib/async-to-promise').bind
  , webmake          = ba2p(require('webmake'))
  , writeFile        = ba2p(require('fs').writeFile)
  , updateManifest   = require('./update-manifest')
  , buildMeetupIndex = require('./build-meetup-index')

  , resolve = path.resolve

  , root = resolve(__dirname, '../../')
  , input = root + '/lib/client/public/main.js'
  , output = root + '/public/j/main.js'
  , include = [root + '/lib/client/tpl'];

module.exports = function () {
	return buildMeetupIndex()
	(lock(webmake, input, { include: include }))
	(function (content) {
		return writeFile(output,
			content.replace('%%CLIENT_VER%%', format(new Date())));
	})
	(updateManifest);
};
