angular
	.module('SeeAll')
	.controller('SettingsCtrl', SettingsCtrl);


function SettingsCtrl($scope, $reactive) {
	$reactive(this).attach($scope);
}