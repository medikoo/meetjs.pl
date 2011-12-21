'use strict';

var db = module.exports =  require('base/db');

db.create('city', {
	name: {
		label: "Nazwa",
		type: 'text',
		required: true
	},
	htmlClass: {
		label: "HTML Class",
		type: 'text',
		required: true
	}
});

db.create('location', {
	name: {
		label: "Nazwa",
		type: 'text',
		required: true
	},
	street: {
		label: "Ulica",
		type: 'text',
		required: true
	},
	zipCode: {
		label: "Kod",
		type: 'text',
		required: true
	},
	city: {
		label: "Miasto",
		type: db.city,
		required: true
	},
	directionsUrl: {
		label: "Dojazd",
		type: 'text'
	},
	memo: {
		label: "Info",
		type: 'memo'
	}
});

db.create('event', {
	date: {
		label: "Data",
		type: "date",
		required: true,
		min: -500,
		max: 500
	},
	location: {
		label: "Miejsce",
		type: db.location
	},
	memo: {
		label: "Opis",
		type: 'memo'
	},
	url: {
		label: "Url",
		type: 'text',
		required: true
	},
	past: {
		label: "Przeszła",
		type: 'bool'
	}
});

db.create('speaker', {
	id: {
		label: "Id",
		type: 'text',
		required: true
	},
	name: {
		label: "Imię",
		type: 'text',
		required: true
	},
	surname: {
		label: "Nazwisko",
		type: 'text',
		required: true
	},
	company: {
		label: "Firma",
		type: 'text'
	},
	www: {
		label: "WWW",
		type: 'text'
	},
	twitter: {
		label: "Twitter",
		type: 'text'
	}
});

db.create('lecture', {
	subject: {
		label: "Temat",
		type: 'text',
		required: true
	},
	event: {
		label: "Meetup",
		type: db.event,
		required: true
	},
	speaker: {
		label: "Prelegent",
		type: db.speaker,
		required: true
	},
	time: {
		label: "Godzina",
		type: 'datetime',
		required: true
	},
	srUrl: {
		label: "SpeakerRate",
		type: 'text'
	}
});

require('../../settings/meetups');
