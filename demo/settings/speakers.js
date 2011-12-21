'use strict';

var db = require('base/db').speaker;

// speaker -> name, surname, company (optional), www (optional), twitter (optional)

exports.marcoos = db.create({
	id: 'marcoos',
	name: "Marek",
	surname: "Stępień",
	company: "Aviary",
	www: "marcoos.com"
});

exports.robert = db.create({
	id: 'robert',
	name: "Robert",
	surname: "Tomaszewski"
});

exports.michalbe = db.create({
	id: 'michalbe',
	name: "Michał",
	surname: "Budzyński",
	company: "Gadu Gadu",
	www: "michalbe.com"
});

exports.gandalf = db.create({
	id: 'gandalf',
	name: "Zbigniew",
	surname: "Braniecki",
	company: "Mozilla"
});

exports.ttunik = db.create({
	id: 'ttunik',
	name: "Tomasz",
	surname: "Tunik",
	www: "provoke.it/einie"
});
