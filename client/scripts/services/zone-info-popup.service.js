angular
	.module('SeeAll')
	.service('ZoneInfoPopup', ZoneInfoPopup);


function ZoneInfoPopup($ionicPopup, $rootScope) {

	var templateUrl = 'client/templates/zone-info-popup.html';

	this.showPopup = function(zone) {

		var title = zone.name ? zone.name : zone._id;

		this._scope = $rootScope.$new();
		this._scope.zone = zone;

		var alertPopup = $ionicPopup.show({
			title: title,
			templateUrl: templateUrl,
			scope: this._scope,
			buttons: [ { text: 'OK' } ]
		});
	};
}
