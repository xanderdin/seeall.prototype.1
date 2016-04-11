angular
	.module('SeeAll')
	.controller('AppCtrl', AppCtrl);


function AppCtrl($scope, $reactive, $state, $ionicHistory, $ionicLoading,
				 NewDeviceModal, DevicesFunctions) {

	$reactive(this).attach($scope);


	this.helpers({
		devices: function() {
			return DevicesFunctions.getAllDevices();
		},
		isConnected: function() {
			return Meteor.status().connected;
		},
		isLoggedIn: function() {
			return Meteor.userId() !== null;
		}
	});


	this.showNewDeviceModal = showNewDeviceModal;
	this.getDeviceMainIconClass = getDeviceMainIconClass;
	this.getDeviceSecondaryIconClass = getDeviceSecondaryIconClass;
	this.logOut = logOut;


	function logOut() {
		$ionicLoading.show();
        Meteor.logout(function() {
			$ionicHistory.currentView($ionicHistory.backView());
            $state.go('app.login', null, { location: 'replace' });
			$ionicLoading.hide();
		});
    }

	function showNewDeviceModal() {
		NewDeviceModal.showModal();
	}


	function getDeviceMainIconClass(device) {
		return DevicesFunctions.getMainIconClass(device);
	}


	function getDeviceSecondaryIconClass(device) {
		return DevicesFunctions.getSecondaryIconClass(device);
	}
}
