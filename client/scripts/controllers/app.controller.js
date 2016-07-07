import { Controller } from '../entities';


export default class AppCtrl extends Controller {

	constructor() {
		super(...arguments);

		this.helpers({
			devices: function() {
				return this.DevicesFunctions.getAllDevices();
			},
			isConnected: function() {
				return Meteor.status().connected;
			},
			isLoggedIn: function() {
				return Meteor.userId() !== null;
			},
			username: function() {
				const u = Meteor.user();
				return u ? u.username : '';
			}
		});
	}


	logOut() {
		const scope = this;
		this.$ionicLoading.show();
        Meteor.logout(function() {
			scope.$ionicLoading.hide();
			scope.$ionicHistory.currentView(scope.$ionicHistory.backView());
            scope.$state.go('app.login', null, { location: 'replace' });
			scope.$ionicLoading.hide();
		});
    }


	showNewDeviceModal() {
		this.NewDeviceModal.showModal();
	}


	getDeviceMainIconClass(device) {
		return this.DevicesFunctions.getMainIconClass(device);
	}


	getDeviceSecondaryIconClass(device) {
		return this.DevicesFunctions.getSecondaryIconClass(device);
	}
}


AppCtrl.$inject = ['$scope', '$state', '$ionicHistory', '$ionicLoading',
				   'NewDeviceModal', 'DevicesFunctions'];
