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
			scope: this,
			buttonClicked: function(index) {
				switch (index) {
					case 0:
						this.scope.cmdArm(device);
						break;
					case 1:
						this.scope.cmdDisarm(device);
						break;
					case 2:
						this.scope.cmdState(device);
						break;
					case 3:
						this.scope.showEditPopup(device);
						break;
				}
				return true;
			},
			destructiveButtonClicked: function() {
				this.scope.showRemovePopup(device);
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

		this.scope = this.$rootScope.$new();
		this.scope.newName = device.name;

		this.$ionicPopup.show({
			title: '<strong>GID</strong>:' + device._id,
			templateUrl: 'client/templates/device-edit-popup.html',
			scope: this.scope,
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

			if (result !== undefined && result !== device.name) {
				Meteor.call('updateDevice', { _id: device._id, name: result });
			}
		});
	}


	showRemovePopup(device) {
		const scope = this;
		this.$ionicPopup.confirm({
			title: device.name ? device.name : device._id,
			template: 'Remove device?'
		}).then(function(result) {
			if (result) {
				Meteor.call('removeDevice',	device._id,
					function(error, result) {
						scope.$ionicHistory.currentView(scope.$ionicHistory.backView());
						scope.$state.go('app.about', null, { location: 'replace' });
					}
				);
			}
		});
	}
}


DeviceActions.$inject = ['$rootScope', '$ionicActionSheet', '$ionicPopup',
						 '$state', '$ionicHistory'];
