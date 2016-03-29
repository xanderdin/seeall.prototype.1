angular
	.module('SeeAll')
	.controller('DeviceCtrl', DeviceCtrl);


function DeviceCtrl($scope, $reactive, $stateParams, DevicePictures, DeviceActions, ZonePictures, ZoneActions, ZoneInfo) {

	$reactive(this).attach($scope);

	var devId = $stateParams.devId;

	this.helpers({
		data: function() {
			return Devices.findOne(devId);
		},

		history: function() {
			return History.find({ deviceId: devId });
		},

		lastHistoryLine: function() {
			return History.findOne({ deviceId: devId }, { sort: { at: -1 }});
		}
	});


	this.getMainPicture = getMainPicture;
	this.getZoneMainPicture = getZoneMainPicture;
	this.showDeviceActionSheet = showDeviceActionSheet;
	this.showZoneActionSheet = showZoneActionSheet;
	this.showZoneInfoPopup = showZoneInfoPopup;


	function getMainPicture() {
		return DevicePictures.getMainPicture(this.data);
	}


	function getZoneMainPicture(zone) {
		return ZonePictures.getMainPicture(this.data, zone);
	}


	function showDeviceActionSheet() {
		DeviceActions.showActionSheet(this.data);
	}


	function showZoneActionSheet(zone) {
		ZoneActions.showActionSheet(this.data, zone);
	}


	function showZoneInfoPopup(zone) {
		ZoneInfo.showPopup(zone);
	}
}
