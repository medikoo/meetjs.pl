'use strict';

exports.JS_DEVEL = false;
exports.OFFLINE = true;

exports.PORT = 8137;

throw new Error(
	"Please Setup SMTP and EMAIL settings (see config.js)"
		+ " before running application");

// exports.SMTP = {
// 	host: 'mail.example.com',
// 	use_authentication: true,
// 	user: 'user@example.com',
// 	pass: 'CHANGEME'
// };

// exports.EMAIL = 'user@example.com';
