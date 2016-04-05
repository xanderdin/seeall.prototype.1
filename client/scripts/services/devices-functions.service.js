angular
    .module('SeeAll')
    .service('DevicesFunctions', DevicesFunctions);


function DevicesFunctions(ZonesFunctions) {

    this.isArmed = isArmed;
    this.isInAlarm = isInAlarm;
    this.getAllDevices = getAllDevices;
    this.getLastHistoryRecord = getLastHistoryRecord;
    this.getMainIconClass = getMainIconClass;
    this.getSecondaryIconClass = getSecondaryIconCalss;
    this.hasZonesAttentionInfo = hasZonesAttentionInfo;


    function isArmed(device) {

        if (device.zones) {
            for (i = 0; i < device.zones.length; i++) {
                if (device.zones[i].isArmed === true) {
                    return true;
                }
            }
        }

        return false;
    }


    function isInAlarm(device) {

        if (device.zones) {
            for (i = 0; i < device.zones.length; i++) {
                if (ZonesFunctions.isInAlarm(device.zones[i])) {
                    return true;
                }
            }
        }

        if (device.isTamperOpen) {
            return true;
        }

        return false;
    }


    function hasZonesAttentionInfo(device) {

        if (device.zones) {
            for (i = 0; i < device.zones.length; i++) {
                if (ZonesFunctions.hasAttentionInfo(device.zones[i])) {
                    return true;
                }
            }
        }

        return false;
    }


    function getAllDevices() {
        return Devices.find();
    }


    function getLastHistoryRecord(device) {
        return History.findOne({ deviceId: device._id }, { sort: { at: -1 }});
    }


    function getMainIconClass(device) {

        var armed = isArmed(device);

        //if (device.isSubscribed !== true) {
        //    return 'dark icon ion-ios-help-outline';
        //} else

        if (device.isOff === true) {
            return 'dark icon ion-eye-disabled';
        } else if (armed && isInAlarm(device)) {
            return 'assertive icon flaticon-broken37';
        } else if (armed) {
            return 'balanced icon flaticon-locked25';
        } else {
			return 'dark icon ion-unlocked';
		}
    }


    function getSecondaryIconCalss(device) {

        var result = 'energized icon ion-alert-circled';

        if (device.isOnline === false) {
            return result;
        }

        if (device.isTamperOpen === true) {
            return result;
        }

        if (device.isBatteryLow === true) {
            return result;
        }

        if (device.isPowerLost === true) {
            return result;
        }

        if (device.isFailure === true) {
            return 'assertive icon ion-alert-circled';
        }

        if (hasZonesAttentionInfo(device)) {
            return result;
        }

        return '';
    }

}
