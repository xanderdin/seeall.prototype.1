angular
	.module('SeeAll')
	.service('DevicePictures', DevicePictures);


function DevicePictures() {

	this.getMainPicture = getMainPicture;
	this.getAttentionIndicator = getAttentionIndicator;
	this.getOnlineIndicator = getOnlineIndicator;
	this.getBatteryIndicator = getBatteryIndicator;
	this.getPowerIndicator = getPowerIndicator;
	this.getTamperIndicator = getTamperIndicator;
	this.getFailureIndicator = getFailureIndicator;


	function getMainPicture(device) {

		if (device.isOff) {
			return 'off.svg';
		}

		var isArmed = false;

		if (device.zones) {
			for (i = 0; i < device.zones.length; i++) {
				if (device.zones[i].isArmed === true) {
					isArmed = true;
					break;
				}
			}
        }
		// if (isArmed === undefined) {
		// 	return 'question.svg';
		// } else
		if (isArmed === true) {
			return 'armed.svg';
		}

		return 'disarmed.svg';
	}

	function getAttentionIndicator(device) {

	}

	function getOnlineIndicator(device) {

	}

	function getBatteryIndicator(device) {

	}

	function getPowerIndicator(device) {

	}

	function getTamperIndicator(device) {

	}

	function getFailureIndicator(device) {

	}
}
