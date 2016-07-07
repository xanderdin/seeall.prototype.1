import { Controller } from '../entities';


export default class NewDeviceModalCtrl extends Controller {

	constructor() {
		super(...arguments);
	}


	hideNewDeviceModal() {
		this.NewDeviceModal.hideModal();
	}


	newDevice() {

		const scope = this;

		this.$ionicLoading.show();

		Meteor.call('newDevice', {
			_id: this.gid,
			name: this.name
		},
		function(error, result) {
			scope.$ionicLoading.hide();
			scope.hideNewDeviceModal();
			if (error) {
                return scope.handleError(error);
            }
			if (result) {
				scope.$ionicHistory.currentView(scope.$ionicHistory.backView());
                scope.$state.go('app.device',
							   { devId: result },
							   { location: 'replace' });
            }
		});
	}


	handleError(error) {
		this.$ionicPopup.alert({
			title: error.reason || 'Failed to add a new device',
			template: 'Please try again',
			okType: 'button-positive button-clear'
		});
	}
}


NewDeviceModalCtrl.$inject = ['$scope', '$state', '$ionicHistory',
							  '$ionicPopup', '$ionicLoading', 'NewDeviceModal'];
