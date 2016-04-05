angular
	.module('SeeAll')
	.controller('DeviceCtrl', DeviceCtrl);


function DeviceCtrl($scope, $reactive, $stateParams, $ionicScrollDelegate,
					DeviceActions, DevicesFunctions, ZoneActions, ZoneInfo,
					ZonesFunctions) {

	$reactive(this).attach($scope);

	var devId = $stateParams.devId;

	this.helpers({
		data: function() {
			return Devices.findOne(devId);
		},

		history: function() {
			return History.find({ deviceId: devId }, { sort: { at:  -1 }});
		},

		lastHistoryRecord: function() {
			return History.findOne({ deviceId: devId }, { sort: { at: -1 }});
		}
	});


	//$scope.$watchCollection('device.history', (oldVal, newVal) => {
	//	var animate = oldVal.length !== newVal.length;
	//	$ionicScrollDelegate.$getByHandle('historyScroll').scrollBottom(animate);
	//});


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
	this.getIsArmed = getIsArmed;
	this.getMainIconClass = getMainIconClass;
	this.getSecondaryIconClass = getSecondaryIconClass;
	this.getZoneMainIconClass = getZoneMainIconClass;
	this.getZoneSecondaryIconClass = getZoneSecondaryIconClass;


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


	function getIsArmed() {
        return DevicesFunctions.isArmed(this.data);
    }


	function getMainIconClass() {
        return DevicesFunctions.getMainIconClass(this.data);
    }


	function getSecondaryIconClass() {
        return DevicesFunctions.getSecondaryIconClass(this.data);
    }


	function getZoneMainIconClass(zone) {
        return ZonesFunctions.getMainIconClass(zone);
    }


	function getZoneSecondaryIconClass(zone) {
        return ZonesFunctions.getSecondaryIconClass(zone);
    }

}
