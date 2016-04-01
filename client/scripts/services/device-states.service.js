angular
    .module('SeeAll')
    .service('DeviceStates', DeviceStates);


function DeviceStates() {

    this.getIsArmed = getIsArmed;

    function getIsArmed(device) {

        var isArmed = false;

        if (device.zones) {
            for (i = 0; i < device.zones.length; i++) {
				if (device.zones[i].isArmed === true) {
					isArmed = true;
					break;
				}
			}
        }

        return isArmed;
    }
}
