import { Controller } from '../entities';


export default class DevicesCtrl extends Controller {

    constructor() {
        super(...arguments);

        this.helpers({
            all: function() {
                return this.DevicesFunctions.getAllDevices();
            }
        });
    }


    getDeviceMainIconClass(device) {
        return this.DevicesFunctions.getMainIconClass(device);
    }


	getDeviceSecondaryIconClass(device) {
		return this.DevicesFunctions.getSecondaryIconClass(device);
	}


    showNewDeviceModal() {
        this.NewDeviceModal.showModal();
    }


    deviceIsArmed(device) {
        return this.DevicesFunctions.isArmed(device);
    }


    lastHistoryRecord(device) {
        return this.DevicesFunctions.getLastHistoryRecord(device);
    }


    lastHistoryRecordInfo(device) {

        var record = this.lastHistoryRecord(device);

        if (record && record.info) {
            return record.info;
        } else if (device) {
            return device._id;
        }

        return '';
    }


    cmdArm(device) {
        this.DeviceActions.cmdArm(device);
    }


    cmdDisarm(device) {
        this.DeviceActions.cmdDisarm(device);
    }


    cmdState(device) {
        this.DeviceActions.cmdState(device);
    }


    goToDevice(device) {
        this.$ionicHistory.currentView(this.$ionicHistory.backView());
        this.$state.go('app.device',
                       { devId: device._id },
                       { location: 'replace' });
    }


    showActionSheet(device) {
        this.DeviceActions.showActionSheet(device);
    }
}


DevicesCtrl.$inject = ['$scope', '$state', '$ionicHistory', 'DevicesFunctions',
                       'DeviceActions', 'NewDeviceModal'];
