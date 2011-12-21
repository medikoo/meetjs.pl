'use strict';

var port = require('../../config').PORT

if (!port) {
	throw new Error("PORT setting not found in config.js");
}

module.exports = require('base/server/server')(port);
require('./become-prelegent');