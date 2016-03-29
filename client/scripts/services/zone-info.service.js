angular
	.module('SeeAll')
	.service('ZoneInfo', ZoneInfo);


function ZoneInfo($ionicPopup) {

	var templateUrl = 'client/templates/zone-info.html';

	this.showPopup = function(zone) {

		var title = zone.name ? zone.name : zone._id;

		var alertPopup = $ionicPopup.show({
			title: title,
			templateUrl: templateUrl,
			buttons: [ { text: 'OK' } ]
		});
	};
}