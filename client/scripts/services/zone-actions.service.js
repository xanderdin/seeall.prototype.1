import { Service } from '../entities';


export default class ZoneActions extends Service {

	constructor() {
		super(...arguments);
	}


	showActionSheet(device, zone) {

		var buttons;
		var titleText = zone.name ? zone.name : zone._id;

		//if (device.isActivated === true) {
			buttons = [
				{ text: 'Arm' },
				{ text: 'Disarm' },
				{ text: 'Rename' }
			];
		// } else {
		// 	buttons = [
		// 		{ text: 'Activate' }
		// 	];
		// }

		this.$ionicActionSheet.show({
			buttons: buttons,
			titleText: titleText,
			destructiveText: 'Remove',
			cancelText: 'Cancel',
			scope: this,
			buttonClicked: function(index) {
				switch (index) {
					case 0:
						this.scope.cmdArm(device, zone);
						break;
					case 1:
						this.scope.cmdDisarm(device, zone);
						break;
					case 2:
						this.scope.showEditPopup(device, zone);
						break;
				}
				return true;
			},
			destructiveButtonClicked: function() {
				this.scope.showRemovePopup(device, zone);
				return true;
			}
		});
    }


	cmdArm(device, zone) {
		if (device.isOff === true || device.isOnline === false) {
			this.$ionicPopup.alert({
			   title: 'Impossible',
			   template: 'Device is unreachable'
			});
        } else {
			Meteor.call('setZoneArmed', device._id, zone._id, true);
		}
	}


	cmdDisarm(device, zone) {
		if (device.isOff === true || device.isOnline === false) {
			this.$ionicPopup.alert({
			   title: 'Impossible',
			   template: 'Device is unreachable'
			});
        } else {
			Meteor.call('setZoneArmed', device._id, zone._id, false);
		}
	}


	showEditPopup(device, zone) {

		var templateUrl = 'client/templates/zone-edit-popup.html';

		this.scope = this.$rootScope.$new();
		this.scope.newName = zone.name;

		this.$ionicPopup.show({

			title: 'Zone ' + zone._id,
			templateUrl: templateUrl,
			scope: this.scope,
			buttons: [
				{ text: 'Cancel' },
				{
					text: '<b>Save<b>',
					type: 'button-positive',
					onTap: function(event) {
						return this.scope.newName;
					}
				}
			]

		}).then(function(result) {

			if (result !== undefined && result !== zone.name) {
				//Devices.update({ _id: device._id, "zones._id": zone._id }, { $set: { "zones.$.name": result } });
				Meteor.call('updateZone', device._id, { _id: zone._id, name: result });
			}
		});
	}


	showRemovePopup(device, zone) {
		this.$ionicPopup.confirm({
			title: 'Zone ' + zone._id,
			template: 'Remove zone?'
		}).then(function(result) {
			if (result) {
				Meteor.call('removeZone', device._id, zone._id);
			}
		});
	}
}


ZoneActions.$inject = ['$rootScope', '$ionicActionSheet', '$ionicPopup'];
