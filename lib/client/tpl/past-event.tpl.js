'use strict';

var dateFormat = require('es5-ext/lib/Date/format')('%d.%m').call
  , timeFormat = require('es5-ext/lib/Date/format')('%H:%M').call
  , contains   = require('es5-ext/lib/List/contains').call
  , aritize    = require('es5-ext/lib/Function/aritize').call
  , db         = require('../db')
  , monthNames = require('../month-names')

  , pastEvents = db.event.filter('past', Boolean).list('date')
  , range;

range = function (n) {
	var r = [], i = 0;
	while (++i <= n) {
		r.push(i);
	}
	return r;
};

exports['content-wrap'] = function () {
	var next, previous, index;

	index = pastEvents.indexOf(this);
	previous = pastEvents[index - 1];
	next = pastEvents[index + 1];

	article(
		header(
			div({ 'class': 'header-content' },
				div({ 'class': 'event-date-block' },
					span({ 'class': 'event-day'}, this.date.getDate()),
					abbr({ 'class': 'event-month' }, monthNames[this.date.getMonth()])),
				h1(this.location.city.name),
				nav(ul(
					li({ 'class': 'prev-meeting' },
						a({ href: previous && '/' + previous.uri + '/' },
							previous && dateFormat(previous.date))),
					li({ 'class': 'next-meeting' },
						a({ href: next && '/' + next.uri + '/' },
							next && dateFormat(next.date)))
				)),
				span({ 'class': 'hour' }, "Godz: ", timeFormat(this.date)),
				span({ 'class': 'place' }, this.location.name, ", ",
					this.location.street)
			)),
		section({ id: 'description' },
			section({ 'class': 'article-content' },
				(this.memo || "").split('\n').filter(Boolean).map(aritize(p, 1))
			),
			section({ 'class': 'gallery' }, range(this.imagesCount).map(function (i) {
				return img({ src: '/i/events/' + this.id + '.' + i + '.jpg' })
			}, this))),
		section({ id: 'prelegents' },
			div({ 'class': 'content-container' },
				h2("Prelegenci"),
				ul(
					this._get(db.lecture).list('time').map(function (lecture) {
						var speaker = lecture.speaker;
						return li({ 'class': 'prelegent' },
							contains(this.lectureImages, speaker.id) &&
							img({ 'src':  '/i/events/' + this.id + '.prelegent.' +
								speaker.id + '.jpg', width: 150, height: 150 }),
							h2(lecture.subject),
							span({ 'class': 'speaker' }, speaker.name, " ", speaker.surname),
							" ", speaker.company &&
							span({ 'class': 'company' }, speaker.company), " ",
							speaker.www && a({ 'class': 'website', href: speaker.www  },
								speaker.www), " ",
							lecture.srUrl && a({ 'class': 'rate', href: lecture.srUrl },
								"Oceń na SpeakerRate"));
					}, this)))),
		section({ id: 'event-participants' },
			h2("Wzieli udział:"),
			ul(li("TODO: FACEBOOK SERVICE"))
		),
		section({ id: 'comments' },
			div({ 'class': 'content-container' },
				h2("Komentarze"),
				div("TODO: INTEGRATE WITH FACEBOOK OR DIQUIS")))
	);
};
