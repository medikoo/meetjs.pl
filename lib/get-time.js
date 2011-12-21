'use strict';

module.exports = function (date) {
	return function (hours, minutes) {
		var tdate = new Date(date.getTime());
		tdate.setHours(hours);
		tdate.setMinutes(minutes || 0);
		return tdate;
	};
};
