'use strict';

var parse      = JSON.parse
  , parseUrl   = require('url').parse
  , nodemailer = require('nodemailer')
  , config     = require('../../config')
  , server     = require('./server');

nodemailer.SMTP = config.SMTP;

server.ext.push(function (req, res) {
	var data;
	if ((req.url !== '/become-prelegent/') ||
		(req.method.toLowerCase() !== 'post')) {
		return false;
	}
	data = '';
	req.setEncoding('utf8');
	req.on('data', function (chunk) {
		data += chunk;
	});
	req.on('end', function () {
		data = parse(data);
		console.log("GOT DATA", data);
		nodemailer.send_mail({
			sender: data.email,
			to: config.EMAIL,
			subject: 'Zgłoszenie do ' + data.city + ', od ' + data.name,
			body: data.description
		}, function (err, done) {
			if (err || !done) {
				console.log("SEND MAIL ERROR", data, err, done);
				res.writeHead(500, {
					'Content-Type': 'text/plain; charset=utf8'
				});
				res.end("Cannot send email");
				return;
			}
			res.writeHead(200, {
				'Content-Type': 'text/plain; charset=utf8'
			});
			res.end("OK");
		});
	});
	return true;
});
