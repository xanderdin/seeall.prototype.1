angular
	.module('SeeAll')
	.controller('AppCtrl', AppCtrl);


function AppCtrl($scope, $reactive, NewDeviceModal, DevicesFunctions) {

	$reactive(this).attach($scope);


	this.helpers({
		devices: function() {
			return DevicesFunctions.getAllDevices();
		},
		isConnected: function() {
			return Meteor.status().connected;
		}
	});


	this.showNewDeviceModal = showNewDeviceModal;
	this.getDeviceMainIconClass = getDeviceMainIconClass;
	this.getDeviceSecondaryIconClass = getDeviceSecondaryIconClass;


	function showNewDeviceModal() {
		NewDeviceModal.showModal();
	}


	function getDeviceMainIconClass(device) {
		return DevicesFunctions.getMainIconClass(device);
	}


	function getDeviceSecondaryIconClass(device) {
		return DevicesFunctions.getSecondaryIconClass(device);
	}
}
