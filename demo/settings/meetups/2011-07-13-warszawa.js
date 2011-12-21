'use strict';

var db        = require('base/db')
  , locations = require('../locations')
  , speakers  = require('../speakers')

  , event, date, time;

date = new Date(2011, 6, 13, 11, 0, 0);
time = require('../../lib/get-time')(date);

module.exports = event = db.event.create({
	date: date,
	location: locations.warszawa.pjwstk,
	url: 'http://www.facebook.com/events/314750241869986/',
	past: true,
	memo: "Well, the way they make shows is, they make one show. That show's called a pilot. Then they show that show to the people who make shows, and on the strength of that one show they decide if they're going to make more shows. Some pilots get picked and become television programs. Some don't, become nothing. She starred in one of the ones that became nothing.\nNormally, both your asses would be dead as fucking fried chicken, but you happen to pull this shit while I'm in a transitional period so I don't wanna kill you, I wanna help you. But I can't give you this case, it don't belong to me. Besides, I've already been through too much shit this morning over this case to hand it over to your dumb ass."
});

db.lecture.create({
	subject: "Ted did figure it out - time travel",
	speaker: speakers.ttunik,
	event: event,
	time: time(11)
});

db.lecture.create({
	subject: "How it's possible, how it's done, what the dangers are",
	speaker: speakers.robert,
	event: event,
	time: time(11, 30)
});

db.lecture.create({
	subject: "Why don't they know? ",
	speaker: speakers.gandalf,
	event: event,
	time: time(12)
});

db.lecture.create({
	subject: "Hence we die down here. Just as a matter of deductive logic.",
	speaker: speakers.ttunik,
	event: event,
	time: time(12, 30)
});


