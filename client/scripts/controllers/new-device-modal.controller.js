angular
	.module('SeeAll')
	.controller('NewDeviceModalCtrl', NewDeviceModalCtrl);


function NewDeviceModalCtrl($scope, $reactive, $state, $ionicHistory, NewDeviceModal) {

	$reactive(this).attach($scope);

	this.hideNewDeviceModal = hideNewDeviceModal;
	this.newDevice = newDevice;


	function hideNewDeviceModal() {
		NewDeviceModal.hideModal();
	}


	function newDevice() {

		hideNewDeviceModal();

		Meteor.call('newDevice', {
			_id: this.gid,
			name: this.name
		},
		function(error, result) {
			if (result) {
				$ionicHistory.currentView($ionicHistory.backView());
                $state.go('app.device', { devId: result }, { location: 'replace' });
            }
		});
	}
}
