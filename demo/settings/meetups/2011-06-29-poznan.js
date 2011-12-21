'use strict';

var db        = require('base/db')
  , locations = require('../locations')
  , speakers  = require('../speakers')

  , event, date, time;

date = new Date(2011, 5, 29, 11, 0, 0);
time = require('../../lib/get-time')(date);

module.exports = event = db.event.create({
	date: date,
	location: locations.poznan.zoo,
	url: 'http://www.facebook.com/events/314750241869986/',
	past: true,
	memo: "Well, the way they make shows is, they make one show. That show's called a pilot. Then they show that show to the people who make shows, and on the strength of that one show they decide if they're going to make more shows. Some pilots get picked and become television programs. Some don't, become nothing. She starred in one of the ones that became nothing.\nNormally, both your asses would be dead as fucking fried chicken, but you happen to pull this shit while I'm in a transitional period so I don't wanna kill you, I wanna help you. But I can't give you this case, it don't belong to me. Besides, I've already been through too much shit this morning over this case to hand it over to your dumb ass."
});

db.lecture.create({
	subject: "Do you see any Teletubbies in here?",
	speaker: speakers.marcoos,
	event: event,
	time: time(11),
	srUrl: 'http://speakerrate.com/'
});

db.lecture.create({
	subject: "Well, that's what you see at a toy store",
	speaker: speakers.robert,
	event: event,
	time: time(11, 30)
});

db.lecture.create({
	subject: "The lysine contingency",
	speaker: speakers.gandalf,
	event: event,
	time: time(12)
});

db.lecture.create({
	subject: "The animals can't manufacture the amino acid lysine",
	speaker: speakers.ttunik,
	event: event,
	time: time(12, 30)
});
