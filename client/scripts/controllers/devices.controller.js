angular
    .module('SeeAll')
    .controller('DevicesCtrl', DevicesCtrl);


function DevicesCtrl($scope, $reactive, DevicesService, NewDevice,
                     DeviceStates, DeviceActions) {

    $reactive(this).attach($scope);


    this.helpers({
        all: function() {
            return DevicesService.all();
        }
    });


    this.showNewDeviceModal = function() {
        NewDevice.showModal();
    };


    this.deviceIsArmed = function(device) {
        return DeviceStates.getIsArmed(device);
    };


    this.lastDeviceHistoryLineInfo = function(device) {
        return DevicesService.lastDeviceHistoryLine(device).info;
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
}
