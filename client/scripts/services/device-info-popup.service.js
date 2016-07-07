import { Service } from '../entities';


export default class DeviceInfoPopup extends Service {

	constructor() {
		super(...arguments);

		this.templateUrl = 'client/templates/device-info-popup.html';
	}


	showPopup(device) {

		var title = device.name ? device.name : device._id;

		this._scope = this.$rootScope.$new();
		this._scope.device = device;

		this.$ionicPopup.show({
			title: title,
			templateUrl: this.templateUrl,
			scope: this._scope,
			buttons: [ { text: 'OK' } ]
		});
	};
}


DeviceInfoPopup.$inject = ['$ionicPopup', '$rootScope'];
