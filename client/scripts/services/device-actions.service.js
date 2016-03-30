angular
	.module('SeeAll')
	.service('DeviceActions', DeviceActions);


function DeviceActions($rootScope, $ionicActionSheet, $ionicPopup) {

	this.showEditActionSheet = showEditActionSheet;
	this.showCmdActionSheet = showCmdActionSheet;
	this.cmdArm = cmdArm;
	this.cmdDisarm = cmdDisarm;
	this.cmdState = cmdState;
	this.showEditPopup = showEditPopup;
	this.showRemovePopup = showRemovePopup;

	function showEditActionSheet(device) {

		var title;
		var buttons;

		//if (device.isActivated === true) {
			title = device.name ? device.name : device._id;
			buttons = [
				{ text: 'Edit' },
				{ text: 'Deactivate' }
			];
		// } else {
		// 	buttons = [
		// 		{ text: 'Activate' }
		// 	];
		// }

		$ionicActionSheet.show({
			titleText: title,
			buttons: buttons,
			destructiveText: 'Remove',
			cancelText: 'Cancel',
			buttonClicked: function(index) {
				switch (index) {
					case 0:
						showEditPopup(device);
						break;
				}
				return true;
			},
			destructiveButtonClicked: function() {
				showRemovePopup(device);
				return true;
			}
		});
	}


	function showCmdActionSheet(device) {

		var title;
		var buttons;

		//if (device.isActivated === true) {
			title = device.name ? device.name : device._id;
			buttons = [
				{ text: 'Arm' },
				{ text: 'Disarm' },
				{ text: 'State' }
			];
		// } else {
		// 	buttons = [
		// 		{ text: 'Activate' }
		// 	];
		// }

		$ionicActionSheet.show({
			titleText: title,
			buttons: buttons,
			//destructiveText: 'Remove',
			cancelText: 'Cancel',
			buttonClicked: function(index) {
				switch (index) {
					case 0:
						cmdArm(device);
						break;
					case 1:
						cmdDisarm(device);
						break;
					case 2:
						cmdState(device);
						break;
				}
				return true;
			}
		});
	}


	function cmdArm(device) {
		// $ionicPopup.alert({
		// 	title: 'Arm',
		// 	template: device._id
		// });
		Meteor.call('setDeviceArmed', device._id, true);
	}


	function cmdDisarm(device) {
		// $ionicPopup.alert({
		// 	title: 'Disarm',
		// 	template: device._id
		// });
		Meteor.call('setDeviceArmed', device._id, false);
	}


	function cmdState(device) {
		$ionicPopup.alert({
			title: 'State',
			template: device._id
		});
	}


	function showEditPopup(device) {

		this._scope = $rootScope.$new();
		this._scope.newName = device.name;

		$ionicPopup.show({
			title: 'Edit Device ' + device._id,
			templateUrl: 'client/templates/device-edit.html',
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


	function showRemovePopup(device) {
		$ionicPopup.confirm({
			title: device.name ? device.name : device._id,
			template: 'Remove device?'
		}).then(function(result) {
			if (result) {
				Meteor.call('removeDevice', device._id);
			}
		});
	}
}
