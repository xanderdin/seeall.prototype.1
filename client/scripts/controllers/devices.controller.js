angular
    .module('SeeAll')
    .controller('DevicesCtrl', DevicesCtrl);


function DevicesCtrl($scope, $reactive, $state, $ionicHistory,
                     DevicesFunctions, NewDevice, DeviceActions) {

    $reactive(this).attach($scope);


    this.helpers({
        all: function() {
            return DevicesFunctions.getAllDevices();
        }
    });


    this.getDeviceMainIconClass = getDeviceMainIconClass;
    this.getDeviceSecondaryIconClass = getDeivceSecondaryIconClass;


    function getDeviceMainIconClass(device) {
        return DevicesFunctions.getMainIconClass(device);
    }


    function getDeivceSecondaryIconClass(device) {
        return DevicesFunctions.getSecondaryIconClass(device);
    }


    this.showNewDeviceModal = function() {
        NewDevice.showModal();
    };


    this.deviceIsArmed = function(device) {
        return DevicesFunctions.isArmed(device);
    };


    this.lastHistoryRecord = function(device) {
        return DevicesFunctions.getLastHistoryRecord(device);
    };


    this.cmdArm = function(device) {
        DeviceActions.cmdArm(device);
    };


    this.cmdDisarm = function(device) {
        DeviceActions.cmdDisarm(device);
    };


    this.cmdState = function(device) {
        DeviceActions.cmdState(device);
    };


    this.goToDevice = function(device) {
        $ionicHistory.currentView($ionicHistory.backView());
        $state.go('app.device', { devId: device._id }, { location: 'replace' });
    };


    this.showEditActionSheet = function(device) {
        DeviceActions.showEditActionSheet(device);
    }
}
