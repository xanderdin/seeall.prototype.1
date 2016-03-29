angular
	.module('SeeAll')
	.controller('DevicesCtrl', DevicesCtrl);


function DevicesCtrl($scope, $reactive, NewDevice, DevicePictures, DeviceActions) {

	$reactive(this).attach($scope);

	this.getMainPicture = getMainPicture;
	this.showNewDeviceModal = showNewDeviceModal;
	this.showDeviceActionSheet = showDeviceActionSheet;
	this.cmdArm = cmdArm;
	this.cmdDisarm = cmdDisarm;
	this.cmdState = cmdState;
	this.lastHistoryLine = lastHistoryLine;
	

	function getMainPicture(device) {
		return DevicePictures.getMainPicture(device);
	}


	function showDeviceActionSheet(device) {
		DeviceActions.showActionSheet(device);
	}


	function showNewDeviceModal() {
		NewDevice.showModal();
	}


	function cmdArm(device) {
		DeviceActions.cmdArm(device);
	}


	function cmdDisarm(device) {
		DeviceActions.cmdDisarm(device);
	}


	function cmdState(device) {
		DeviceActions.cmdState(device);
	}


	function lastHistoryLine(device) {
		return History.findOne({ deviceId: device._id }, { sort: { at: -1 }});
	}


	this.helpers({

		list: function() {
			return Devices.find();
		},

		count: function() {
			return Devices.find().count();
		}
	});
}