'use strict';

var db        = require('base/db')
  , locations = require('../locations')
  , speakers  = require('../speakers')

  , event, date, time;

date = new Date(2011, 8, 12, 11, 0, 0);
time = require('../../lib/get-time')(date);

module.exports = event = db.event.create({
	date: date,
	location: locations.poznan.zoo,
	url: 'http://www.facebook.com/events/314750241869986/'
});

db.lecture.create({
	subject: "That show's called a pilot",
	speaker: speakers.marcoos,
	event: event,
	time: time(11)
});

db.lecture.create({
	subject: "Dogs are the best",
	speaker: speakers.robert,
	event: event,
	time: time(11, 30)
});

db.lecture.create({
	subject: "Give me Raoul",
	speaker: speakers.gandalf,
	event: event,
	time: time(12)
});

db.lecture.create({
	subject: "I'm not a mistake!",
	speaker: speakers.ttunik,
	event: event,
	time: time(12, 30)
});
