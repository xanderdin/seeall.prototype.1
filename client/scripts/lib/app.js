angular
	.module('SeeAll', [
		'angular-meteor',
		'ionic'
		])
	.config(AppConfig);


if (Meteor.isCordova) {
	angular.element(document).on('deviceready', onReady);
} else {
	angular.element(document).ready(onReady);
}


function onReady() {
	angular.bootstrap(document, ['SeeAll']);
}


function AppConfig($ionicConfigProvider) {

	$ionicConfigProvider.scrolling.jsScrolling(true);
	$ionicConfigProvider.tabs.position('top');
	$ionicConfigProvider.tabs.style('striped');
}
