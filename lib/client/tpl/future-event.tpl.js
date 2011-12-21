var db        = require('../db')
  , navigator = require('base/client/navigator')
  , build;

build = function (lecture) {
	li({ 'class': 'speech' },
		h2(lecture.subject),
		span({ 'class': 'speaker' },
			lecture.speaker.name + ' ' + lecture.speaker.surname),
		lecture.speaker.company && span({ 'class': 'company' },
			lecture.speaker.company),
		lecture.speaker.www && a({ href: 'http://' + lecture.speaker.www },
			lecture.speaker.www)
	);
};

exports['all-events'] = function () {
	var setClasses;

	// Populate lectures list
	this._get(db.lecture).list('date').map(build);

	// Change 'active' class on city map when we enter given url
	// It should be done in more obvious way,
	// it's just workaround for current limitations
	navigator.on('/' + this.uri + (this.uri ? '/' : ''),
		setClasses = function () {
			var current = document.querySelector('#event-map li.active');
			if (current) {
				current.classList.remove('active');
			}
			current = document.getElementById('event-' + this.id);
			if (!current) {
				throw new Error("Could not find event of id 'event-" + this.id +
					"' on map");
			}
			current.classList.add('active');
		}.bind(this));
	setClasses();
};

exports['event-participants'] = function () {
	li("TODO: FACEBOOK SERVICE FOR ", this.id);
};
