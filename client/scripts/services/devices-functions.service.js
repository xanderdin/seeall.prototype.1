import { Service } from '../entities';


export default class DevicesFunctions extends Service {

    constructor() {
        super(...arguments);
    }


    isArmed(device) {

        if (device && device.zones) {
            for (i = 0; i < device.zones.length; i++) {
                if (device.zones[i].type === 'siren') {
                    continue;
                }
                if (device.zones[i].isArmed === true) {
                    return true;
                }
            }
        }

        return false;
    }


    isInAlarm(device) {

        if (!device) {
            return false;
        }

        if (device.zones) {
            for (i = 0; i < device.zones.length; i++) {
                if (this.ZonesFunctions.isInAlarm(device.zones[i])) {
                    return true;
                }
            }
        }

        if (device.isTamperOpen) {
            return true;
        }

        return false;
    }


    hasAttentionInfo(device) {

        if (!device) {
            return false;
        }

        if (device.isOnline === false) {
            return true;
        }

        if (device.isTamperOpen === true) {
            return true;
        }

        if (device.isBatteryLow === true) {
            return true;
        }

        if (device.isPowerLost === true) {
            return true;
        }

        return false;
    }


    hasZonesAttentionInfo(device) {

        if (device && device.zones) {
            for (i = 0; i < device.zones.length; i++) {
                if (this.ZonesFunctions.hasAttentionInfo(device.zones[i])) {
                    return true;
                }
            }
        }

        return false;
    }


    getAllDevices() {
        return Devices.find();
    }


    getLastHistoryRecord(device) {
        return History.findOne({ deviceId: device._id }, { sort: { at: -1 }});
    }


    getMainIconClass(device) {

        var armed = this.isArmed(device);

        //if (device.isSubscribed !== true) {
        //    return 'dark icon ion-ios-help-outline';
        //} else

        if (!device) {
			return 'dark icon ion-help';
        } else if (device.isFailure === true) {
            return 'assertive icon ion-sad-outline';
        } else if (device.isOff === true) {
            return 'dark icon ion-ios-lightbulb';
        } else if (armed && this.isInAlarm(device)) {
            return 'assertive icon flaticon-broken37';
        } else if (armed) {
            return 'balanced icon flaticon-locked25';
        } else {
			return 'dark icon ion-unlocked';
		}
    }


    getSecondaryIconClass(device) {

        if (!device) {
            return '';
        }

        var icon = ' icon ion-alert';

        if (device.isFailure === true) {
            return 'assertive' + icon;
        }

        var result = 'energized' + icon;

        if (this.hasAttentionInfo(device)) {
            return result;
        }

        if (this.hasZonesAttentionInfo(device)) {
            return result;
        }

        return '';
    }
}


DevicesFunctions.$inject = ['ZonesFunctions'];
