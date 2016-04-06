angular
	.module('SeeAll')
	.service('ZoneActions', ZoneActions);


function ZoneActions($rootScope, $ionicActionSheet, $ionicPopup) {

	//this.showEditActionSheet = showEditActionSheet;
	//this.showCmdActionSheet = showCmdActionSheet;
	this.showActionSheet = showActionSheet;
	this.cmdArm = cmdArm;
	this.cmdDisarm = cmdDisarm;
	this.showEditPopup = showEditPopup;
	this.showRemovePopup = showRemovePopup;


	function showActionSheet(device, zone) {

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

		$ionicActionSheet.show({
			buttons: buttons,
			titleText: titleText,
			destructiveText: 'Remove',
			cancelText: 'Cancel',
			buttonClicked: function(index) {
				switch (index) {
					case 0:
						cmdArm(device, zone);
						break;
					case 1:
						cmdDisarm(device, zone);
						break;
					case 2:
						showEditPopup(device, zone);
						break;
				}
				return true;
			},
			destructiveButtonClicked: function() {
				showRemovePopup(device, zone);
				return true;
			}
		});
    }

	//function showEditActionSheet(device, zone) {
	//
	//	var buttons;
	//	var titleText = zone.name ? zone.name : zone._id;
	//
	//	//if (device.isActivated === true) {
	//		buttons = [
	//			{ text: 'Edit' }
	//		];
	//	// } else {
	//	// 	buttons = [
	//	// 		{ text: 'Activate' }
	//	// 	];
	//	// }
	//
	//	$ionicActionSheet.show({
	//		buttons: buttons,
	//		titleText: titleText,
	//		destructiveText: 'Remove',
	//		cancelText: 'Cancel',
	//		buttonClicked: function(index) {
	//			switch (index) {
	//				case 0:
	//					showEditPopup(device, zone);
	//					break;
	//			}
	//			return true;
	//		},
	//		destructiveButtonClicked: function() {
	//			showRemovePopup(device, zone);
	//			return true;
	//		}
	//	});
	//}
	//
	//
	//function showCmdActionSheet(device, zone) {
	//
	//	var buttons;
	//	var titleText = zone.name ? zone.name : zone._id;
	//
	//	//if (device.isActivated === true) {
	//		buttons = [
	//			{ text: 'Arm' },
	//			{ text: 'Disarm' }
	//		];
	//	// } else {
	//	// 	buttons = [
	//	// 		{ text: 'Activate' }
	//	// 	];
	//	// }
	//
	//	$ionicActionSheet.show({
	//		buttons: buttons,
	//		titleText: titleText,
	//		cancelText: 'Cancel',
	//		buttonClicked: function(index) {
	//			switch (index) {
	//				case 0:
	//					cmdArm(device, zone);
	//					break;
	//				case 1:
	//					cmdDisarm(device, zone);
	//					break;
	//			}
	//			return true;
	//		//},
	//		//destructiveButtonClicked: function() {
	//		//	showRemovePopup(device, zone);
	//		//	return true;
	//		}
	//	});
	//}


	function cmdArm(device, zone) {
		if (device.isOff === true || device.isOnline === false) {
			$ionicPopup.alert({
			   title: 'Impossible',
			   template: 'Device is unreachable'
			});
        } else {
			Meteor.call('setZoneArmed', device._id, zone._id, true);
		}
	}


	function cmdDisarm(device, zone) {
		if (device.isOff === true || device.isOnline === false) {
			$ionicPopup.alert({
			   title: 'Impossible',
			   template: 'Device is unreachable'
			});
        } else {
			Meteor.call('setZoneArmed', device._id, zone._id, false);
		}
	}


	function showEditPopup(device, zone) {

		var templateUrl = 'client/templates/zone-edit-popup.html';

		this._scope = $rootScope.$new();
		this._scope.newName = zone.name;

		$ionicPopup.show({

			title: 'Zone ' + zone._id,
			templateUrl: templateUrl,
			scope: this._scope,
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


	function showRemovePopup(device, zone) {
		$ionicPopup.confirm({
			title: 'Zone ' + zone._id,
			template: 'Remove zone?'
		}).then(function(result) {
			if (result) {
				Meteor.call('removeZone', device._id, zone._id);
			}
		});
	}
}
