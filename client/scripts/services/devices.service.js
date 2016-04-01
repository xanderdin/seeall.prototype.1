angular
    .module('SeeAll')
    .service('DevicesService', DevicesService);


function DevicesService() {

    this.all = function() {
        return Devices.find();
    };

    this.count = function() {
        return Devices.find().count();
    };

    this.lastDeviceHistoryLine = function(device) {
        return History.findOne({ deviceId: device._id }, { sort: { at: -1 }});
    };
}
