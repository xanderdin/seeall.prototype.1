angular
	.module('SeeAll')
	.controller('DevicesCtrl', DevicesCtrl);


function DevicesCtrl($scope, $reactive, NewDevice,
					 DevicePictures, DeviceActions, DeviceStates) {

	$reactive(this).attach($scope);

	this.getMainPicture = getMainPicture;
	this.showNewDeviceModal = showNewDeviceModal;
	this.showDeviceEditActionSheet = showDeviceEditActionSheet;
	this.showDeviceCmdActionSheet = showDeviceCmdActionSheet;
	this.cmdArm = cmdArm;
	this.cmdDisarm = cmdDisarm;
	this.cmdState = cmdState;
	this.lastHistoryLine = lastHistoryLine;
	this.getIsArmed = getIsArmed;


	function getMainPicture(device) {
		return DevicePictures.getMainPicture(device);
	}


	function showDeviceEditActionSheet(device) {
		DeviceActions.showEditActionSheet(device);
	}


	function showDeviceCmdActionSheet(device) {
		DeviceActions.showCmdActionSheet(device);
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


	function getIsArmed(device) {
        return DeviceStates.getIsArmed(device);
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
