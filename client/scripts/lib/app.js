angular
	.module('SeeAll', [
		'angular-meteor',
		'ionic'
		])
	.constant('$ionicLoadingConfig', { template: '<ion-spinner></ion-spinner>'})
	.config(AppConfig);


function AppConfig($ionicConfigProvider) {
	$ionicConfigProvider.scrolling.jsScrolling(true);
	$ionicConfigProvider.tabs.position('top');
	$ionicConfigProvider.tabs.style('striped');
}


if (Meteor.isCordova) {
	angular.element(document).on('deviceready', onReady);
} else {
	angular.element(document).ready(onReady);
}


function onReady() {
	angular.bootstrap(document, ['SeeAll']);
}
