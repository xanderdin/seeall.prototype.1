import { Service } from '../entities';


export default class ZonesFunctions extends Service {

    constructor() {
        super(...arguments);
    }


    isInAlarm(zone) {

        if (!zone) {
            return false;
        }

        // Check zone tamper state despite of 'armed' state
        if (zone.isTamperOpen === true) {
            return true;
        }

        // Check other zone states only if zone is armed
        if (zone.isArmed !== true) {
            return false;
        }

        if (zone.isFired === true) {
            return true;
        }

        if (zone.isLinkLost === true) {
            return true;
        }

        return false;
    }


    hasAttentionInfo(zone) {

        if (!zone) {
            return false;
        }

        if (zone.isTamperOpen === true) {
            return true;
        }

        if (zone.isLinkLost === true) {
            return true;
        }

        if (zone.isBatteryLow === true) {
            return true;
        }

        if (zone.isPowerLost === true) {
            return true;
        }

        if (zone.isFailure === true) {
            return true;
        }

        return false;
    }


    hasAdditionalInfo(zone) {

        if (!zone) {
            return false;
        }

        if (zone.isTamperOpen !== undefined && zone.isTamperOpen !== null) {
            return true;
        }

        if (zone.isLinkLost !== undefined && zone.isLinkLost !== null) {
            return true;
        }

        if (zone.isBatteryLost !== undefined && zone.isBatteryLow !== null) {
            return true;
        }

        if (zone.isPowerLost !== undefined && zone.isPowerLost !== null) {
            return true;
        }

        if (zone.isFailure !== undefined && zone.isFailure !== null) {
            return true;
        }

        return false;
    }


    getMainIconClass(zone) {

        if (!zone) {
            return 'dark icon ion-ios-help-outline';
        }

        var result;

        var type = zone.type ? zone.type : 'detector';

        switch (type) {

            case 'detector':

                if (zone.isArmed == undefined || zone.isArmed == null) {
                    result = 'dark icon ion-ios-help-outline';
                } else if (zone.isArmed === true && this.isInAlarm(zone)) {
                    result = 'assertive icon flaticon-broken37';
                } else if (zone.isArmed) {
                    result = 'balanced icon flaticon-lock62';
                } else {
                    result = 'dark icon ion-unlocked';
                }

                break;

            case 'siren':

                result = 'positive icon ion-speakerphone';

                break;

            default:

                result = 'dark icon ion-ios-help-outline';

                break;
        }

        return result;
    }


    getSecondaryIconClass(zone) {

        if (zone && this.hasAttentionInfo(zone)) {
            return 'energized icon ion-alert';
        }

        return '';
    }
}



//angular
//    .module('SeeAll')
//    .service('ZonesFunctions', ZonesFunctions);
//
//
//function ZonesFunctions() {
//
//    this.isInAlarm = isInAlarm;
//    this.hasAttentionInfo = hasAttentionInfo;
//    this.hasAdditionalInfo = hasAdditionalInfo;
//    this.getMainIconClass = getMainIconClass;
//    this.getSecondaryIconClass = getSecondaryIconClass;
//
//
//    function isInAlarm(zone) {
//
//        if (!zone) {
//            return false;
//        }
//
//        // Check zone tamper state despite of 'armed' state
//        if (zone.isTamperOpen === true) {
//            return true;
//        }
//
//        // Check other zone states only if zone is armed
//        if (zone.isArmed !== true) {
//            return false;
//        }
//
//        if (zone.isFired === true) {
//            return true;
//        }
//
//        if (zone.isLinkLost === true) {
//            return true;
//        }
//
//        return false;
//    }
//
//
//    function hasAttentionInfo(zone) {
//
//        if (!zone) {
//            return false;
//        }
//
//        if (zone.isTamperOpen === true) {
//            return true;
//        }
//
//        if (zone.isLinkLost === true) {
//            return true;
//        }
//
//        if (zone.isBatteryLow === true) {
//            return true;
//        }
//
//        if (zone.isPowerLost === true) {
//            return true;
//        }
//
//        if (zone.isFailure === true) {
//            return true;
//        }
//
//        return false;
//    }
//
//
//    function hasAdditionalInfo(zone) {
//
//        if (!zone) {
//            return false;
//        }
//
//        if (zone.isTamperOpen !== undefined && zone.isTamperOpen !== null) {
//            return true;
//        }
//
//        if (zone.isLinkLost !== undefined && zone.isLinkLost !== null) {
//            return true;
//        }
//
//        if (zone.isBatteryLost !== undefined && zone.isBatteryLow !== null) {
//            return true;
//        }
//
//        if (zone.isPowerLost !== undefined && zone.isPowerLost !== null) {
//            return true;
//        }
//
//        if (zone.isFailure !== undefined && zone.isFailure !== null) {
//            return true;
//        }
//
//        return false;
//    }
//
//
//    function getMainIconClass(zone) {
//
//        if (!zone) {
//            return 'dark icon ion-ios-help-outline';
//        }
//
//        var result;
//
//        var type = zone.type ? zone.type : 'detector';
//
//        switch (type) {
//
//            case 'detector':
//
//                if (zone.isArmed == undefined || zone.isArmed == null) {
//                    result = 'dark icon ion-ios-help-outline';
//                } else if (zone.isArmed === true && isInAlarm(zone)) {
//                    result = 'assertive icon flaticon-broken37';
//                } else if (zone.isArmed) {
//                    result = 'balanced icon flaticon-lock62';
//                } else {
//                    result = 'dark icon ion-unlocked';
//                }
//
//                break;
//
//            case 'siren':
//
//                result = 'positive icon ion-speakerphone';
//
//                break;
//
//            default:
//
//                result = 'dark icon ion-ios-help-outline';
//
//                break;
//        }
//
//        return result;
//    }
//
//
//    function getSecondaryIconClass(zone) {
//
//        if (zone && hasAttentionInfo(zone)) {
//            return 'energized icon ion-alert';
//        }
//
//        return '';
//    }
//}
