angular
	.module('SeeAll')
	.controller('AppCtrl', AppCtrl);


function AppCtrl($scope, $reactive, NewDevice, DevicesFunctions) {

	$reactive(this).attach($scope);


	this.helpers({
		devices: function() {
			return DevicesFunctions.getAllDevices();
		}
	});


	this.showNewDeviceModal = showNewDeviceModal;
	this.getDeviceMainIconClass = getDeviceMainIconClass;
	this.getDeviceSecondaryIconClass = getDeviceSecondaryIconClass;


	function showNewDeviceModal() {
		NewDevice.showModal();
	}


	function getDeviceMainIconClass(device) {
		return DevicesFunctions.getMainIconClass(device);
	}


	function getDeviceSecondaryIconClass(device) {
		return DevicesFunctions.getSecondaryIconClass(device);
	}
}
