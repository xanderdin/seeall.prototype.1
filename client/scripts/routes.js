angular
	.module('SeeAll')
	.config(config);


function config($stateProvider, $urlRouterProvider) {

	$stateProvider

		.state('app', {
			url: '/app',
			abstract: true,
			templateUrl: 'client/templates/app.html',
			controller: 'AppCtrl as app'
		})

		.state('app.login', {
			url: '/login',
			//templateUrl: 'client/templates/login.html',
			//controller: 'LoginCtrl as login'
			views: {
				'content-area': {
					templateUrl: 'client/templates/login.html',
					controller: 'LoginCtrl as login'
				}
			}
		})

		.state('app.devices', {
			url: '/devices',
			views: {
				'content-area': {
					templateUrl: 'client/templates/devices.html',
					controller: 'DevicesCtrl as devices'
				}
			}
		})

		.state('app.device', {
			//url: '/devices/:devId',
			url: '/device/:devId',
			//url: '/:devId',
			views: {
				'content-area': {
					templateUrl: 'client/templates/device.html',
					controller: 'DeviceCtrl as device'
				}
			}
		})

		.state('app.settings', {
			url: '/settings',
			views: {
				'content-area': {
					templateUrl: 'client/templates/settings.html',
					controller: 'SettingsCtrl as settings'
				}
			}
		})

		.state('app.help', {
			url: '/help',
			views: {
				'content-area': {
					templateUrl: 'client/templates/help.html',
					controller: 'HelpCtrl as help'
				}
			}
		})

		.state('app.about', {
			url: '/about',
			views: {
				'content-area': {
					templateUrl: 'client/templates/about.html',
					controller: 'AboutCtrl as about'
				}
			}
		});

	$urlRouterProvider.otherwise('/app/about');
}
