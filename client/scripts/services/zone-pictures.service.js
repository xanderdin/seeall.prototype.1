angular
	.module('SeeAll')
	.service('ZonePictures', ZonePictures);


function ZonePictures() {

	this.getMainPicture = getMainPicture;


	function getMainPicture(device, zone) {

		if (zone.isArmed) {
			return 'armed.svg';
		} else {
			return 'disarmed.svg';
		}

	}
}