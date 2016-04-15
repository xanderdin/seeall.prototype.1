import { Controller } from '../entities';


export default class DeviceCtrl extends Controller {

	constructor() {
		super(...arguments);

		this.devId = this.$stateParams.devId;

		this.helpers({
			data: function() {
				return Devices.findOne(this.devId);
			},

			history: function() {
				return History.find({ deviceId: this.devId }, { sort: { at:  -1 }});
			},

			lastHistoryRecord: function() {
				return History.findOne({ deviceId: this.devId }, { sort: { at: -1 }});
			}
		});
	}


	showDeviceActionSheet() {
        DeviceActions.showActionSheet(this.data);
    }


	cmdArm() {
        this.DeviceActions.cmdArm(this.data);
    }


	cmdDisarm() {
        this.DeviceActions.cmdDisarm(this.data);
    }


	cmdState() {
        this.DeviceActions.cmdState(this.data);
    }


	showZoneActionSheet(zone) {
        this.ZoneActions.showActionSheet(this.data, zone);
    }


	showDeviceInfoPopup(device) {
        this.DeviceInfoPopup.showPopup(device);
    }


	showZoneInfoPopup(zone) {
		this.ZoneInfoPopup.showPopup(zone);
	}


	zoneCmdArm(zone) {
        this.ZoneActions.cmdArm(this.data, zone);
    }


	zoneCmdDisarm(zone) {
        this.ZoneActions.cmdDisarm(this.data, zone);
    }


	getIsArmed() {
        return this.DevicesFunctions.isArmed(this.data);
    }


	getMainIconClass() {
        return this.DevicesFunctions.getMainIconClass(this.data);
    }


	getSecondaryIconClass() {
        return this.DevicesFunctions.getSecondaryIconClass(this.data);
    }


	getZoneMainIconClass(zone) {
        return this.ZonesFunctions.getMainIconClass(zone);
    }


	getZoneSecondaryIconClass(zone) {
        return this.ZonesFunctions.getSecondaryIconClass(zone);
    }


	hasZoneAttentionInfo(zone) {
        return this.ZonesFunctions.hasAttentionInfo(zone);
    }
}


DeviceCtrl.$inject = ['$scope', '$stateParams', '$ionicScrollDelegate',
					  'DevicesFunctions', 'DeviceActions', 'DeviceInfoPopup',
					  'ZonesFunctions', 'ZoneActions', 'ZoneInfoPopup'];


//angular
//	.module('SeeAll')
//	.controller('DeviceCtrl', DeviceCtrl);
//
//
//function DeviceCtrl($scope, $reactive, $stateParams, $ionicScrollDelegate,
//					DevicesFunctions, DeviceActions, DeviceInfoPopup,
//					ZonesFunctions, ZoneActions, ZoneInfoPopup) {
//
//	$reactive(this).attach($scope);
//
//	var devId = $stateParams.devId;
//
//	this.helpers({
//		data: function() {
//			return Devices.findOne(devId);
//		},
//
//		history: function() {
//			return History.find({ deviceId: devId }, { sort: { at:  -1 }});
//		},
//
//		lastHistoryRecord: function() {
//			return History.findOne({ deviceId: devId }, { sort: { at: -1 }});
//		}
//	});
//
//
//	//$scope.$watchCollection('device.history', (oldVal, newVal) => {
//	//	var animate = oldVal.length !== newVal.length;
//	//	$ionicScrollDelegate.$getByHandle('historyScroll').scrollBottom(animate);
//	//});
//
//
//	//this.showDeviceEditActionSheet = showDeviceEditActionSheet;
//	//this.showDeviceCmdActionSheet = showDeviceCmdActionSheet;
//	//this.showZoneEditActionSheet = showZoneEditActionSheet;
//	//this.showZoneCmdActionSheet = showZoneCmdActionSheet;
//	this.showDeviceActionSheet = showDeviceActionSheet;
//	this.showZoneActionSheet = showZoneActionSheet;
//	this.showDeviceInfoPopup = showDeviceInfoPopup;
//	this.showZoneInfoPopup = showZoneInfoPopup;
//	this.cmdArm = cmdArm;
//	this.cmdDisarm = cmdDisarm;
//	this.cmdState = cmdState;
//	this.zoneCmdArm = zoneCmdArm;
//	this.zoneCmdDisarm = zoneCmdDisarm;
//	this.getIsArmed = getIsArmed;
//	this.getMainIconClass = getMainIconClass;
//	this.getSecondaryIconClass = getSecondaryIconClass;
//	this.getZoneMainIconClass = getZoneMainIconClass;
//	this.getZoneSecondaryIconClass = getZoneSecondaryIconClass;
//	this.hasZoneAttentionInfo = hasZoneAttentionInfo;
//
//
//	//function showDeviceEditActionSheet() {
//	//	DeviceActions.showEditActionSheet(this.data);
//	//}
//	//
//	//
//	//function showDeviceCmdActionSheet() {
//	//	DeviceActions.showCmdActionSheet(this.data);
//	//}
//
//
//	function showDeviceActionSheet() {
//        DeviceActions.showActionSheet(this.data);
//    }
//
//
//	function cmdArm() {
//        DeviceActions.cmdArm(this.data);
//    }
//
//
//	function cmdDisarm() {
//        DeviceActions.cmdDisarm(this.data);
//    }
//
//
//	function cmdState() {
//        DeviceActions.cmdState(this.data);
//    }
//
//
//	//function showZoneEditActionSheet(zone) {
//	//	ZoneActions.showEditActionSheet(this.data, zone);
//	//}
//	//
//	//
//	//function showZoneCmdActionSheet(zone) {
//	//	ZoneActions.showCmdActionSheet(this.data, zone);
//	//}
//
//
//	function showZoneActionSheet(zone) {
//        ZoneActions.showActionSheet(this.data, zone);
//    }
//
//
//	function showDeviceInfoPopup(device) {
//        DeviceInfoPopup.showPopup(device);
//    }
//
//
//	function showZoneInfoPopup(zone) {
//		ZoneInfoPopup.showPopup(zone);
//	}
//
//
//	function zoneCmdArm(zone) {
//        ZoneActions.cmdArm(this.data, zone);
//    }
//
//
//	function zoneCmdDisarm(zone) {
//        ZoneActions.cmdDisarm(this.data, zone);
//    }
//
//
//	function getIsArmed() {
//        return DevicesFunctions.isArmed(this.data);
//    }
//
//
//	function getMainIconClass() {
//        return DevicesFunctions.getMainIconClass(this.data);
//    }
//
//
//	function getSecondaryIconClass() {
//        return DevicesFunctions.getSecondaryIconClass(this.data);
//    }
//
//
//	function getZoneMainIconClass(zone) {
//        return ZonesFunctions.getMainIconClass(zone);
//    }
//
//
//	function getZoneSecondaryIconClass(zone) {
//        return ZonesFunctions.getSecondaryIconClass(zone);
//    }
//
//
//	function hasZoneAttentionInfo(zone) {
//        return ZonesFunctions.hasAttentionInfo(zone);
//    }
//
//}
