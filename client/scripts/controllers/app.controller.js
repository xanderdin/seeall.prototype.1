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


//angular
//	.module('SeeAll')
//	.controller('AppCtrl', AppCtrl);
//
//
//function AppCtrl($scope, $reactive, $state, $ionicHistory, $ionicLoading,
//				 NewDeviceModal, DevicesFunctions) {
//
//	$reactive(this).attach($scope);
//
//
//	this.helpers({
//		devices: function() {
//			return DevicesFunctions.getAllDevices();
//		},
//		isConnected: function() {
//			return Meteor.status().connected;
//		},
//		isLoggedIn: function() {
//			return Meteor.userId() !== null;
//		}
//	});
//
//
//	this.showNewDeviceModal = showNewDeviceModal;
//	this.getDeviceMainIconClass = getDeviceMainIconClass;
//	this.getDeviceSecondaryIconClass = getDeviceSecondaryIconClass;
//	this.logOut = logOut;
//
//
//	function logOut() {
//		$ionicLoading.show();
//        Meteor.logout(function() {
//			$ionicHistory.currentView($ionicHistory.backView());
//            $state.go('app.login', null, { location: 'replace' });
//			$ionicLoading.hide();
//		});
//    }
//
//	function showNewDeviceModal() {
//		NewDeviceModal.showModal();
//	}
//
//
//	function getDeviceMainIconClass(device) {
//		return DevicesFunctions.getMainIconClass(device);
//	}
//
//
//	function getDeviceSecondaryIconClass(device) {
//		return DevicesFunctions.getSecondaryIconClass(device);
//	}
//}
