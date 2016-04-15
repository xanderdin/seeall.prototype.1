import { Service } from '../entities';


export default class DeviceActions extends Service {
	constructor() {
		super(...arguments);

	}


	showActionSheet(device) {

		var title;
		var buttons;

		//if (device.isActivated === true) {
			title = device.name ? device.name : device._id;
			buttons = [
				{ text: 'Arm' },
				{ text: 'Disarm' },
				{ text: 'State' },
				{ text: 'Rename' }
				//{ text: 'Deactivate' }
			];
		// } else {
		// 	buttons = [
		// 		{ text: 'Activate' }
		// 	];
		// }

		this.$ionicActionSheet.show({
			titleText: title,
			buttons: buttons,
			destructiveText: 'Remove',
			cancelText: 'Cancel',
			buttonClicked: function(index) {
				switch (index) {
					case 0:
						this.cmdArm(device);
						break;
					case 1:
						this.cmdDisarm(device);
						break;
					case 2:
						this.cmdState(device);
						break;
					case 3:
						this.showEditPopup(device);
						break;
				}
				return true;
			},
			destructiveButtonClicked: function() {
				this.showRemovePopup(device);
				return true;
			}
		});
	}


	cmdArm(device) {
		if (device.isOff === true || device.isOnline === false) {
			this.$ionicPopup.alert({
			   title: 'Impossible',
			   template: 'Device is unreachable'
			});
        } else {
			Meteor.call('setDeviceArmed', device._id, true);
		}
	}


	cmdDisarm(device) {
		if (device.isOff === true || device.isOnline === false) {
			this.$ionicPopup.alert({
			   title: 'Impossible',
			   template: 'Device is unreachable'
			});
        } else {
			Meteor.call('setDeviceArmed', device._id, false);
		}
	}


	cmdState(device) {
		this.$ionicPopup.alert({
			title: 'State',
			template: device._id
		});
	}


	showEditPopup(device) {

		this._scope = this.$rootScope.$new();
		this._scope.newName = device.name;

		this.$ionicPopup.show({
			title: '<strong>GID</strong>:' + device._id,
			templateUrl: 'client/templates/device-edit-popup.html',
			scope: this._scope,
			buttons: [
				{ text: 'Cancel' },
				{
					text: '<b>Save</b>',
					type: 'button-positive',
					onTap: function(event) {
						return this.scope.newName;
					}
				}
			]
		}).then(function(result) {

			this._scope.$destroy();

			if (result !== undefined && result !== device.name) {
				Meteor.call('updateDevice', { _id: device._id, name: result });
			}
		});
	}


	showRemovePopup(device) {
		this.$ionicPopup.confirm({
			title: device.name ? device.name : device._id,
			template: 'Remove device?'
		}).then(function(result) {
			if (result) {
				Meteor.call('removeDevice',	device._id,
					function(error, result) {
						this.$ionicHistory.currentView(this.$ionicHistory.backView());
						this.$state.go('app.about', null, { location: 'replace' });
					}
				);
			}
		});
	}
}


DeviceActions.$inject = ['$rootScope', '$ionicActionSheet', '$ionicPopup',
						 '$state', '$ionicHistory'];


//angular
//	.module('SeeAll')
//	.service('DeviceActions', DeviceActions);
//
//
//function DeviceActions($rootScope, $ionicActionSheet, $ionicPopup,
//					   $state, $ionicHistory) {
//
//	//this.showEditActionSheet = showEditActionSheet;
//	//this.showCmdActionSheet = showCmdActionSheet;
//	this.showActionSheet = showActionSheet;
//	this.cmdArm = cmdArm;
//	this.cmdDisarm = cmdDisarm;
//	this.cmdState = cmdState;
//	this.showEditPopup = showEditPopup;
//	this.showRemovePopup = showRemovePopup;
//
//	function showActionSheet(device) {
//
//		var title;
//		var buttons;
//
//		//if (device.isActivated === true) {
//			title = device.name ? device.name : device._id;
//			buttons = [
//				{ text: 'Arm' },
//				{ text: 'Disarm' },
//				{ text: 'State' },
//				{ text: 'Rename' }
//				//{ text: 'Deactivate' }
//			];
//		// } else {
//		// 	buttons = [
//		// 		{ text: 'Activate' }
//		// 	];
//		// }
//
//		$ionicActionSheet.show({
//			titleText: title,
//			buttons: buttons,
//			destructiveText: 'Remove',
//			cancelText: 'Cancel',
//			buttonClicked: function(index) {
//				switch (index) {
//					case 0:
//						cmdArm(device);
//						break;
//					case 1:
//						cmdDisarm(device);
//						break;
//					case 2:
//						cmdState(device);
//						break;
//					case 3:
//						showEditPopup(device);
//						break;
//				}
//				return true;
//			},
//			destructiveButtonClicked: function() {
//				showRemovePopup(device);
//				return true;
//			}
//		});
//	}
//
//
//	//function showEditActionSheet(device) {
//	//
//	//	var title;
//	//	var buttons;
//	//
//	//	//if (device.isActivated === true) {
//	//		title = device.name ? device.name : device._id;
//	//		buttons = [
//	//			{ text: 'Rename' },
//	//			{ text: 'Deactivate' }
//	//		];
//	//	// } else {
//	//	// 	buttons = [
//	//	// 		{ text: 'Activate' }
//	//	// 	];
//	//	// }
//	//
//	//	$ionicActionSheet.show({
//	//		titleText: title,
//	//		buttons: buttons,
//	//		destructiveText: 'Remove',
//	//		cancelText: 'Cancel',
//	//		buttonClicked: function(index) {
//	//			switch (index) {
//	//				case 0:
//	//					showEditPopup(device);
//	//					break;
//	//			}
//	//			return true;
//	//		},
//	//		destructiveButtonClicked: function() {
//	//			showRemovePopup(device);
//	//			return true;
//	//		}
//	//	});
//	//}
//	//
//	//
//	//function showCmdActionSheet(device) {
//	//
//	//	var title;
//	//	var buttons;
//	//
//	//	//if (device.isActivated === true) {
//	//		title = device.name ? device.name : device._id;
//	//		buttons = [
//	//			{ text: 'Arm' },
//	//			{ text: 'Disarm' },
//	//			{ text: 'State' }
//	//		];
//	//	// } else {
//	//	// 	buttons = [
//	//	// 		{ text: 'Activate' }
//	//	// 	];
//	//	// }
//	//
//	//	$ionicActionSheet.show({
//	//		titleText: title,
//	//		buttons: buttons,
//	//		//destructiveText: 'Remove',
//	//		cancelText: 'Cancel',
//	//		buttonClicked: function(index) {
//	//			switch (index) {
//	//				case 0:
//	//					cmdArm(device);
//	//					break;
//	//				case 1:
//	//					cmdDisarm(device);
//	//					break;
//	//				case 2:
//	//					cmdState(device);
//	//					break;
//	//			}
//	//			return true;
//	//		}
//	//	});
//	//}
//
//
//	function cmdArm(device) {
//		if (device.isOff === true || device.isOnline === false) {
//			$ionicPopup.alert({
//			   title: 'Impossible',
//			   template: 'Device is unreachable'
//			});
//        } else {
//			Meteor.call('setDeviceArmed', device._id, true);
//		}
//	}
//
//
//	function cmdDisarm(device) {
//		if (device.isOff === true || device.isOnline === false) {
//			$ionicPopup.alert({
//			   title: 'Impossible',
//			   template: 'Device is unreachable'
//			});
//        } else {
//			Meteor.call('setDeviceArmed', device._id, false);
//		}
//	}
//
//
//	function cmdState(device) {
//		$ionicPopup.alert({
//			title: 'State',
//			template: device._id
//		});
//	}
//
//
//	function showEditPopup(device) {
//
//		this._scope = $rootScope.$new();
//		this._scope.newName = device.name;
//
//		$ionicPopup.show({
//			title: '<strong>GID</strong>:' + device._id,
//			templateUrl: 'client/templates/device-edit-popup.html',
//			scope: this._scope,
//			buttons: [
//				{ text: 'Cancel' },
//				{
//					text: '<b>Save</b>',
//					type: 'button-positive',
//					onTap: function(event) {
//						return this.scope.newName;
//					}
//				}
//			]
//		}).then(function(result) {
//
//			this._scope.$destroy();
//
//			if (result !== undefined && result !== device.name) {
//				Meteor.call('updateDevice', { _id: device._id, name: result });
//			}
//		});
//	}
//
//
//	function showRemovePopup(device) {
//		$ionicPopup.confirm({
//			title: device.name ? device.name : device._id,
//			template: 'Remove device?'
//		}).then(function(result) {
//			if (result) {
//				Meteor.call('removeDevice',	device._id,
//					function(error, result) {
//						$ionicHistory.currentView($ionicHistory.backView());
//						$state.go('app.about', null, { location: 'replace' });
//					}
//				);
//			}
//		});
//	}
//}
