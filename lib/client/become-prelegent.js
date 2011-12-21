'use strict';

var stringify = JSON.stringify
  , submit    = require('base/client/tpl/helpers/submit')
  , emailRe   = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/
	  , messagesDom, inProgress, reportError, form;

form = document.querySelector('#become-prelegent form');
messagesDom = document.querySelector("section.speaker-info div.messages");

reportError = function () {
	messagesDom.innerHTML = '<p class="error">Nie można było wysłać zapytania'
		+ '. Spróbuj ponownie później.</p>';
};

form.onsubmit = submit(function (data) {
	var errors = [], xhr;
	if (inProgress) {
		return;
	}
	messagesDom.innerHTML = '';
	if (!data.name) {
		errors.push("Podaj imię");
	}
	if (!data.email.match(emailRe)) {
		errors.push("Podaj prawidłowy adres email")
	}
	if (!data.description) {
		errors.push("Podaj temat i opis prezentacji");
	}
	if (errors.length) {
		messagesDom.innerHTML = '<p class="error">' +
			errors.join('</p><p class="error">') + '</p>';
		return;
	}
	inProgress = true;
	xhr = new XMLHttpRequest();
	xhr.open('POST', '/become-prelegent/', true);
	xhr.onload = function (e) {
		console.log("LOADED", e.currentTarget.responseText);
		if (e.currentTarget.responseText === 'OK') {
			messagesDom.innerHTML = '<p>Zgłoszenie zostało przesłane!</p>';
			form.reset();
		} else {
			reportError();
		}
		inProgress = false;
	};
	xhr.onerror = function (e) {
		console.log("XHR ERROR", e);
		reportError();
		inProgress = false;
	};
	console.log("SEND", data);
	xhr.send(stringify(data));
});
