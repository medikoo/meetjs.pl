### Application for meet.js website -> http://meetjs.pl

#### Internals

It's draft implementation of few concepts that would eventually emerge
into neat framework which will allow deployment of applications fully programmed
in JavaScript.
It consist of individual modules/packages among which are old versions of
[es5-ext](https://github.com/medikoo/es5-ext),
[deferred](https://github.com/medikoo/deferred),
[domjs](https://github.com/medikoo/domjs) and
[modules-webmake](https://github.com/medikoo/modules-webmake)

If you're interested in further progress or want to help with project
(highly welcome) follow my [twitter](twitter.com/medikoo) and
[github](https://github.com/medikoo) accounts for latest news.

#### Usage & Installation

It's not in ready state for reuse to build other applications but if you're interested
in setting this application and playing with it, you can do with with following steps:

Have [node.js](http://nodejs.org) installed.

	$ git clone git://github.com/medikoo/meetjs.pl.git  && cd meetjs.pl
	$ npm install
	$ bin/update

Update config.js with needed details.

Application won't be usable without data, so fill files in settings folder and add some meetups.
Alternatively you can setup quick demo configuration instead:

	$ bin/setup-demo

Run server

	$ node .
