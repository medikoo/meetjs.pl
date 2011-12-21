'use strict';

var resolve  = require('path').resolve
  , forever  = require('forever')
  , deferred = require('deferred')
  , a2p      = require('deferred/lib/async-to-promise').call

  , root = resolve(__dirname, '../../')
  , pidFile = root + '/process.pid';

exports = module.exports = function () {
	return a2p(forever.list.bind(forever), null)
	(function (arr) {
		var d = deferred();
		if (arr && arr.some(function (process, index) {
			if (process.pidFile === pidFile) {
				console.log("STOP APPLICATION" );
				forever.stop(process.file).once('stop', d.resolve);
				return true;
			}
			return false;
		})) {
			return d.promise;
		} else {
			return d.resolve(true);
		}
	});
};
exports.pidFile = pidFile
