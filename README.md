Application for *meet.js* website -> http://meetjs.pl

It's draft implementation of few concepts that would eventually emerge
into neat framework which will allow deployment of applications fully programmed in JavaScript.
It consist of individual modules/packages among which are old versions of
[es5-ext](https://github.com/medikoo/es5-ext), [deferred](https://github.com/medikoo/deferred),
[domjs](https://github.com/medikoo/domjs) and [modules-webmake](https://github.com/medikoo/modules-webmake)

It's not in ready state for reuse to build other applications but if you're interested
in setting this application and playing with it, you can do with with following steps:

* Have [node.js](http://nodejs.org) installed
* `$ git clone  && cd meetjs.pl`
* `$ npm install`
* `$ bin/update`
* Update config.js with needed details
* Application won't be usable without data, so to fill files in settings folder and add some meetups
or setup quick demo configuration with `bin/setup-demo`
* Run server

	$ node .

Alternatively you may run it using forever (but due to forever limitation at current time it will work only with node 0.4.x branch):

	$ bin/restart

Stop server with

	$ bin/stop


