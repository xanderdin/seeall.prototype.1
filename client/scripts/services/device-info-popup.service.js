angular
    .module('SeeAll')
    .service('DeviceInfoPopup', DeviceInfoPopup);


function DeviceInfoPopup($ionicPopup, $rootScope) {

	var templateUrl = 'client/templates/device-info-popup.html';

	this.showPopup = function(device) {

		var title = device.name ? device.name : device._id;

		this._scope = $rootScope.$new();
		this._scope.device = device;

		var alertPopup = $ionicPopup.show({
			title: title,
			templateUrl: templateUrl,
			scope: this._scope,
			buttons: [ { text: 'OK' } ]
		});
	};
}
