'use strict';

var defineProperty = Object.defineProperty
  , v              = require('es5-ext/lib/Object/descriptors/v')
  , db             = require('base/db')

  , poznan, warszawa, krakow;

// City -> name, htmlClass
poznan = exports.poznan = db.city.create({
	name: 'Poznań',
	htmlClass: 'poznan'
});

warszawa = exports.warszawa = db.city.create({
	name: 'Warszawa',
	htmlClass: 'warsaw'
});
krakow = exports.krakow = db.city.create({
	name: 'Kraków',
	htmlClass: 'krakow'
});

// Location -> name, street, zipCode, city, directionUrl (optional), memo (optional)

// Poznań
defineProperty(poznan, 'zoo',
	v(db.location.create({
		name: 'Zoo',
		street: 'Zwierzyniecka 20',
		zipCode: '12-123',
		city: poznan
	})));

// Warszawa
defineProperty(warszawa, 'pjwstk',
	v(db.location.create({
		name: 'PJWSTK',
		street: 'Koszykowa',
		zipCode: '00-800',
		city: warszawa
	})));

// Kraków
defineProperty(krakow, 'parkinn',
	v(db.location.create({
		name: 'Park Inn',
		street: 'Tymczasowa',
		zipCode: '34-123',
		city: krakow
	})));
