import { Config, Runner } from './entities';


export class RoutesConfig extends Config {

	constructor() {
		super(...arguments);

		this.isAuthorized = ['$auth', this.isAuthorized.bind(this)];
	}


	configure() {

		this.$stateProvider

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
						controller: 'DevicesCtrl as devices',
						resolve: {
							user: this.isAuthorized
						}
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
						controller: 'DeviceCtrl as device',
						resolve: {
							user: this.isAuthorized
						}
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

		this.$urlRouterProvider.otherwise('/app/about');
	}


	isAuthorized($auth) {
		return $auth.awaitUser();
	}
}


export class RoutesRunner extends Runner {

	run() {
		this.$rootScope.$on('$stateChangeError', (...args) => {
			const err = _.last(args);

			if (err === 'AUTH_REQUIRED') {
                this.$ionicHistory.currentView(this.$ionicHistory.backView());
                this.$state.go('app.login', null, { location: 'replace' });
                //this.$state.go('app.login');
            }
		});
	}
}


RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
RoutesRunner.$inject = ['$rootScope', '$state', '$ionicHistory'];
