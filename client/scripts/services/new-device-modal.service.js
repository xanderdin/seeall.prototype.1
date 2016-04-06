angular
	.module('SeeAll')
	.service('NewDeviceModal', NewDeviceModal);


function NewDeviceModal($rootScope, $ionicModal) {

	var templateUrl = 'client/templates/new-device-modal.html';

	this.showModal = showModal;
	this.hideModal = hideModal;

	function showModal() {
		this._scope = $rootScope.$new();

		$ionicModal.fromTemplateUrl(templateUrl, {
			scope: this._scope
		}).then((modal) => {
			this._modal = modal;
			modal.show();
		});
	}

	function hideModal() {
		this._scope.$destroy();
		this._modal.remove();
	}
}
