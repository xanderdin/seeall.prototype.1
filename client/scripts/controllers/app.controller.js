angular
	.module('SeeAll')
	.controller('AppCtrl', AppCtrl);


function AppCtrl($scope, $reactive, NewDevice, DeviceStates, DevicesService) {
	
	$reactive(this).attach($scope);

	this.showNewDeviceModal = function() {
		NewDevice.showModal();
	}


	this.helpers({
		devices: function() {
			return DevicesService.all();
		}
	});


	this.deviceIsArmed = function(device) {
		return DeviceStates.getIsArmed(device);
	};
}
