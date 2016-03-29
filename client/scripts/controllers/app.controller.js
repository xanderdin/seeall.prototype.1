angular
	.module('SeeAll')
	.controller('AppCtrl', AppCtrl);


function AppCtrl($scope, $reactive, NewDevice) {
	$reactive(this).attach($scope);

	this.showNewDeviceModal = function() {
		NewDevice.showModal();
	}
}