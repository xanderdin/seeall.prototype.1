import { Service } from '../entities';


export default class ZoneInfoPopup extends Service {

	constructor() {
		super(...arguments);
		this.templateUrl = 'client/templates/zone-info-popup.html';
	}


	showPopup(zone) {

		var title = zone.name ? zone.name : zone._id;

		this._scope = this.$rootScope.$new();
		this._scope.zone = zone;

		this.$ionicPopup.show({
			title: title,
			templateUrl: this.templateUrl,
			scope: this._scope,
			buttons: [ { text: 'OK' } ]
		});
	};
}


ZoneInfoPopup.$inject = ['$ionicPopup', '$rootScope'];


//angular
//	.module('SeeAll')
//	.service('ZoneInfoPopup', ZoneInfoPopup);
//
//
//function ZoneInfoPopup($ionicPopup, $rootScope) {
//
//	var templateUrl = 'client/templates/zone-info-popup.html';
//
//	this.showPopup = function(zone) {
//
//		var title = zone.name ? zone.name : zone._id;
//
//		this._scope = $rootScope.$new();
//		this._scope.zone = zone;
//
//		var alertPopup = $ionicPopup.show({
//			title: title,
//			templateUrl: templateUrl,
//			scope: this._scope,
//			buttons: [ { text: 'OK' } ]
//		});
//	};
//}
