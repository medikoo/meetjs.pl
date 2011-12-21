'use strict';

var exec     = require('child_process').exec
  , resolve  = require('path').resolve
  , forever  = require('forever')
  , format   = require('es5-ext/lib/Date/format')('%m-%d.%H:%M:%S.%L').call
  , a2p      = require('deferred/lib/async-to-promise').call
  , stop     = require('./stop')

  , root = resolve(__dirname, '../../')
  , foreverPath = root + '/node_modules/forever/bin/forever'
  , time;

require('deferred/lib/ext/match');

var start = function () {
	console.log('START APPLICATION');
	var cmd = foreverPath + ' start '
		+ '--pidFile ' + stop.pidFile + ' '
		+ '-l ' + root + '/log/' + time + '.log '
		+ '-o ' + root + '/log/' + time + '.out.log '
		+ '-e ' + root + '/log/' + time + '.err.log '
		+ __dirname + '/server.js';
	return a2p(exec, cmd)
	.match(function (out, err) {
		process.stdout.write(out);
		process.stderr.write(err);
	});
};

module.exports = function () {
	time = format(new Date);
	return stop()(start);
};
