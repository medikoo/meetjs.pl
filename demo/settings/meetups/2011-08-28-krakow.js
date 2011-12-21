'use strict';

var db        = require('base/db')
  , locations = require('../locations')
  , speakers  = require('../speakers')

  , event, date, time;

date = new Date(2011, 7, 28, 11, 0, 0);
time = require('../../lib/get-time')(date);

module.exports = event = db.event.create({
	date: date,
	location: locations.krakow.parkinn,
	url: 'http://www.facebook.com/events/314750241869986/'
});

db.lecture.create({
	subject: "You think water moves fast?",
	speaker: speakers.marcoos,
	event: event,
	time: time(11)
});

db.lecture.create({
	subject: "Nature is lethal but it doesn't hold a candle to man",
	speaker: speakers.robert,
	event: event,
	time: time(11, 30)
});

db.lecture.create({
	subject: "The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men",
	speaker: speakers.gandalf,
	event: event,
	time: time(12)
});

db.lecture.create({
	subject: "They called me Mr Glass",
	speaker: speakers.ttunik,
	event: event,
	time: time(12, 30)
});
