import { Controller } from '../entities';


export default class DeviceCtrl extends Controller {

	constructor() {
		super(...arguments);

		this.devId = this.$stateParams.devId;

		Meteor.subscribe('devusers', this.devId);

		this.helpers({
			data() {
				return Devices.findOne(this.devId);
			},

			history() {
				return History.find({ deviceId: this.devId }, { sort: { at:  -1 }});
			},

			lastHistoryRecord() {
				return History.findOne({ deviceId: this.devId }, { sort: { at: -1 }});
			},

			users() {
				// FIXME: this function has a strange weird behaviour.
				var arr = DeviceUsers.find().fetch();
				//console.log(arr);
				return arr;
			}
		});
	}


	showDeviceActionSheet() {
        this.DeviceActions.showActionSheet(this.data);
    }


	cmdArm() {
        this.DeviceActions.cmdArm(this.data);
    }


	cmdDisarm() {
        this.DeviceActions.cmdDisarm(this.data);
    }


	cmdState() {
        this.DeviceActions.cmdState(this.data);
    }


	showZoneActionSheet(zone) {
        this.ZoneActions.showActionSheet(this.data, zone);
    }


	showDeviceInfoPopup(device) {
        this.DeviceInfoPopup.showPopup(device);
    }


	showZoneInfoPopup(zone) {
		this.ZoneInfoPopup.showPopup(zone);
	}


	zoneCmdArm(zone) {
        this.ZoneActions.cmdArm(this.data, zone);
    }


	zoneCmdDisarm(zone) {
        this.ZoneActions.cmdDisarm(this.data, zone);
    }


	getIsArmed() {
        return this.DevicesFunctions.isArmed(this.data);
    }


	getMainIconClass() {
        return this.DevicesFunctions.getMainIconClass(this.data);
    }


	getSecondaryIconClass() {
        return this.DevicesFunctions.getSecondaryIconClass(this.data);
    }


	getZoneMainIconClass(zone) {
        return this.ZonesFunctions.getMainIconClass(zone);
    }


	getZoneSecondaryIconClass(zone) {
        return this.ZonesFunctions.getSecondaryIconClass(zone);
    }


	hasZoneAttentionInfo(zone) {
        return this.ZonesFunctions.hasAttentionInfo(zone);
    }
}


DeviceCtrl.$inject = ['$scope', '$stateParams', '$ionicScrollDelegate',
					  'DevicesFunctions', 'DeviceActions', 'DeviceInfoPopup',
					  'ZonesFunctions', 'ZoneActions', 'ZoneInfoPopup'];
