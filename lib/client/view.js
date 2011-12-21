'use strict';

var timeFormat   = require('es5-ext/lib/Date/format')('%H:%M').call
  , dateFormat   = require('es5-ext/lib/Date/format')('%d.%m').call
  , chain        = require('es5-ext/lib/Function/sequence').call
  , not          = require('es5-ext/lib/Function/not').call
  , forEachRight = require('es5-ext/lib/List/for-each-right').call
  , view         = require('base/client/view')
  , randomId     = require('base/client/tpl/helpers/random-id')
  , db           = require('./db')
  , monthNames   = require('./month-names')
  , meetups      = require('../../settings/meetups')
  , engine       = view.ownerDocument.engine

  , eventMapDom, getEventDom, getPastEventDom, becomeSpeakerDom
  , getBecomeSpeaker, futureEvents, pastEvents, pastEventsDom
  , twitterFeedDom, root, closestEvent, eventResolver, limitPast;

module.exports = view;
// Load templates from this file path
engine.require = require;

getEventDom = function (event) {
	// Build calendar icon for map with details popup
	return this.li(
		{ id: 'event-' + event.id, 'class': event.location.city.htmlClass },
		this.a({ href: '/' + event.uri + (event.uri ? '/' : '') },
		this.div({ 'class': 'event-date-block' },
			this.span({ 'class': 'event-day' }, event.date.getDate()),
			this.abbr({ 'class': 'event-month' }, monthNames[event.date.getMonth()])),
		this.span({ 'class': 'event-city' }, event.location.city.name)),
		this.div({ 'class': 'event-description' },
			this.p({ 'class': 'address' }, event.location.street),
			this.span({ 'class': 'start-time' }, "Start: " + timeFormat(event.date)),
			event.location.directionsUrl &&
			this.span({ 'class': 'direction' },
				this.a({ href: event.location.directionsUrl })),
			this.a({ 'class': 'join', href: event.url }, "Wezmę udział"))
	)();
}.bind(engine.map);

getPastEventDom = function (event) {
	return this.li(
		this.img(
			{ src: '/i/events/' +  event.id + '.cover.jpg', width: 225, height: 140 }),
		this.div(this.span({ 'class': 'date' }, dateFormat(event.date)),
			this.span({ 'class': 'location' }, event.location.city.name),
			this.span({ 'class': 'review' }, this.a({ href: '/' + event.id + '/'},
				"czytaj relację")))
	)();
}.bind(engine.map);

getBecomeSpeaker = function (event) {
	var id = randomId();
	return this._documentFragment(
		this.input({ id: id, type: 'radio', name: 'city', value: event.id,
			checked: event == closestEvent  }),
		this.label({ for: id },
			this.div({ 'class': 'event-date' },
				this.span({ 'class': 'event-day' }, event.date.getDate()),
				this.abbr({ 'class': 'event-month' },
					monthNames[event.date.getMonth()])),
			this.span({ 'class': 'event-city' }, event.location.city.name)))();
}.bind(engine.map);

eventMapDom = engine.getById('event-map');
pastEventsDom = engine.getById('past-event-list-ul');
becomeSpeakerDom = document.querySelector('section.choose-city');

futureEvents = db.event.filter('past', not(Boolean)).list('date');
pastEvents = db.event.filter('past', Boolean).list('date');

closestEvent = futureEvents[0];

// Configure initial event view
eventResolver = function (id) {
	if (meetups[id]) {
		return [meetups[id], [meetups[id].past ? './tpl/past-event.tpl' :
			'./tpl/future-event.tpl']];
	}
};
view.diff(/([a-z0-9-]+)/, eventResolver);
root = view.ownerDocument.resolve('/' + closestEvent.uri + '/');

// Conf repeated from few lines above.
// Workararound for limitation to be resolved
root.diff(/([a-z0-9-]+)/, eventResolver);

root[':not-found:'] = view.diff(':not-found:', './tpl/not-found.tpl');

// Make closest upcoming event as current on home page
closestEvent.uri = '';

// Populate future events map
futureEvents.forEach(chain(getEventDom, eventMapDom.appendChild), eventMapDom);

// Populate past events section
limitPast = 10; // How many past events we show ?
forEachRight(pastEvents.slice(-limitPast),
	chain(getPastEventDom, pastEventsDom.appendChild), pastEventsDom);

// Populate cities in become speaker form
futureEvents.forEach(chain(getBecomeSpeaker, becomeSpeakerDom.appendChild),
	becomeSpeakerDom);

// Configure other areas
require('./twitter-feed');
require('./become-prelegent');

// Load event that should initially appear
view.switchView(root);
