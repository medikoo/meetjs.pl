'use strict';

pastEventsDom = engine.getById('past-event-list-ul');

getPastEventDom = function (event) {
	return this.li(
		this.img({ src: '/i/avatar/1event.png' }),
		this.div(this.span({ 'class': 'date' }, dateFormat(event.date)),
			this.span({ 'class': 'location' }, event.location.city.name),
			this.span({ 'class': 'review' }, this.a({ href: '/' + event.uri + '/'}, "czytaj relację")))
	);
}.bind(engine.map);


db.event.filter('past', Boolean).list('date').map(getPastEventDom)
	.forEach(pastEventsDom.appendChild, pastEventsDom);


loadNextEvent = function () {
	if (currentMapDom) {
		currentMapDom.classList.remove('active');
	}
	(currentMapDom = getEventDom(this)).classList.add('active');
	eventLecturesDom.innerHTML = '';
	getEventLecturesDom(this).forEach(eventLecturesDom.appendChild, eventLecturesDom);
};

navigator.on('/', function () {
	if (currentMapDom) {
		currentMapDom.classList.remove('active');
		eventLecturesDom.innerHTML = '';
	}
});

view.diff(/^([a-z]{2,}-\d{4}-\d{2}-\d{2})$/, function (id) {
	var event, mview;
	if (osome(db.event, function (ev) {
		if (ev.uri === id) {
			return event = ev;
		}
	})) {
		if (event.past) {
			mview = view.diff(id, './tpl/meeting.tpl');
			mview.scope = event;
			mview.load();
		}	else {
			setTimeout(loadNextEvent.bind(event), 0);
			navigator.on('/' + id + '/', loadNextEvent.bind(event));
		}
	}
	return event;
}, './tpl/hack.tpl');

view.diff(':not-found:', './tpl/not-found.tpl');
view.switchView(view);
