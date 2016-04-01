angular
	.module('SeeAll')
	.controller('NewDeviceCtrl', NewDeviceCtrl);


function NewDeviceCtrl($scope, $reactive, $state, $ionicHistory, NewDevice) {

	$reactive(this).attach($scope);

	this.hideNewDeviceModal = hideNewDeviceModal;
	this.newDevice = newDevice;


	function hideNewDeviceModal() {
		NewDevice.hideModal();
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
