angular
    .module('SeeAll')
    .controller('DevicesCtrl', DevicesCtrl);


function DevicesCtrl($scope, $reactive, $state, $ionicHistory,
                     DevicesFunctions, DeviceActions, NewDeviceModal) {

    $reactive(this).attach($scope);


    this.helpers({
        all: function() {
            return DevicesFunctions.getAllDevices();
        }
    });


    this.getDeviceMainIconClass = getDeviceMainIconClass;
    this.getDeviceSecondaryIconClass = getDeivceSecondaryIconClass;
    this.showNewDeviceModal = showNewDeviceModal;
    this.deviceIsArmed = deviceIsArmed;
    this.lastHistoryRecord = lastHistoryRecord;
    this.lastHistoryRecordInfo = lastHistoryRecordInfo;
    this.cmdArm = cmdArm;
    this.cmdDisarm = cmdDisarm;
    this.cmdState = cmdState;
    this.goToDevice = goToDevice;
    this.showActionSheet = showActionSheet;


    function getDeviceMainIconClass(device) {
        return DevicesFunctions.getMainIconClass(device);
    }


    function getDeivceSecondaryIconClass(device) {
        return DevicesFunctions.getSecondaryIconClass(device);
    }


    function showNewDeviceModal() {
        NewDeviceModal.showModal();
    }


    function deviceIsArmed(device) {
        return DevicesFunctions.isArmed(device);
    }


    function lastHistoryRecord(device) {
        return DevicesFunctions.getLastHistoryRecord(device);
    }


    function lastHistoryRecordInfo(device) {

        var record = lastHistoryRecord(device);

        if (record && record.info) {
            return record.info;
        } else if (device) {
            return device._id;
        }

        return '';
    }


    function cmdArm(device) {
        DeviceActions.cmdArm(device);
    }


    function cmdDisarm(device) {
        DeviceActions.cmdDisarm(device);
    }


    function cmdState(device) {
        DeviceActions.cmdState(device);
    }


    function goToDevice(device) {
        $ionicHistory.currentView($ionicHistory.backView());
        $state.go('app.device', { devId: device._id }, { location: 'replace' });
    }


    function showActionSheet(device) {
        DeviceActions.showActionSheet(device);
    }
}
