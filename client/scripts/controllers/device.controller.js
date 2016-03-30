angular
	.module('SeeAll')
	.controller('DeviceCtrl', DeviceCtrl);


function DeviceCtrl($scope, $reactive, $stateParams, $ionicScrollDelegate,
					DevicePictures, DeviceActions, ZonePictures, ZoneActions,
					ZoneInfo) {

	$reactive(this).attach($scope);

	var devId = $stateParams.devId;

	this.helpers({
		data: function() {
			return Devices.findOne(devId);
		},

		history: function() {
			return History.find({ deviceId: devId }, { sort: { at:  -1 }});
		},

		lastHistoryLine: function() {
			return History.findOne({ deviceId: devId }, { sort: { at: -1 }});
		}
	});


	//$scope.$watchCollection('device.history', (oldVal, newVal) => {
	//	var animate = oldVal.length !== newVal.length;
	//	$ionicScrollDelegate.$getByHandle('historyScroll').scrollBottom(animate);
	//});


	this.getMainPicture = getMainPicture;
	this.getZoneMainPicture = getZoneMainPicture;
	this.showDeviceEditActionSheet = showDeviceEditActionSheet;
	this.showDeviceCmdActionSheet = showDeviceCmdActionSheet;
	this.showZoneEditActionSheet = showZoneEditActionSheet;
	this.showZoneCmdActionSheet = showZoneCmdActionSheet;
	this.showZoneInfoPopup = showZoneInfoPopup;
	this.cmdArm = cmdArm;
	this.cmdDisarm = cmdDisarm;
	this.cmdState = cmdState;
	this.zoneCmdArm = zoneCmdArm;
	this.zoneCmdDisarm = zoneCmdDisarm;


	function getMainPicture() {
		return DevicePictures.getMainPicture(this.data);
	}


	function getZoneMainPicture(zone) {
		return ZonePictures.getMainPicture(this.data, zone);
	}


	function showDeviceEditActionSheet() {
		DeviceActions.showEditActionSheet(this.data);
	}


	function showDeviceCmdActionSheet() {
		DeviceActions.showCmdActionSheet(this.data);
	}


	function cmdArm() {
        DeviceActions.cmdArm(this.data);
    }


	function cmdDisarm() {
        DeviceActions.cmdDisarm(this.data);
    }


	function cmdState() {
        DeviceActions.cmdState(this.data);
    }


	function showZoneEditActionSheet(zone) {
		ZoneActions.showEditActionSheet(this.data, zone);
	}


	function showZoneCmdActionSheet(zone) {
		ZoneActions.showCmdActionSheet(this.data, zone);
	}


	function showZoneInfoPopup(zone) {
		ZoneInfo.showPopup(zone);
	}


	function zoneCmdArm(zone) {
        ZoneActions.cmdArm(this.data, zone);
    }


	function zoneCmdDisarm(zone) {
        ZoneActions.cmdDisarm(this.data, zone);
    }
}
