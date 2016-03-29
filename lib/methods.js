Meteor.methods({

	writeHistory: function(userId, devId, info) {

		return History.insert({
			at: new Date(),
			userId: userId,
			deviceId: devId,
			info: info
		});
	},


	newDevice: function(device) {
		
		check(device, { _id: String, name: String }); // TODO: check for gid validity

		if (device._id.length !== 12) {
			throw Meteor.Error('device-gid-required', 'Valid device GID required');
		}		

		Meteor.call('writeHistory', null, device._id, 'New device');

		return Devices.insert(device);
	},


	updateDevice: function(device) {

		check(device, { _id: String, name: String });

		Meteor.call('writeHistory', null, device._id, 'New name: ' + device.name);

		return Devices.update(device._id, { $set: { name: device.name } });
	},


	removeDevice: function(devId) {

		check(devId, String);

		Meteor.call('writeHistory', null, device._id, 'Remove device');

		return Devices.remove(devId);
	},


	updateZone: function(devId, zone) {

		check(devId, String);
		check(zone, { _id: Match.Integer, name: String });

		Meteor.call('writeHistory', null, devId, 'New name for zone ' + zone._id + ': ' + zone.name);

		return Devices.update({ _id: devId, "zones._id": zone._id },
			{ $set: { "zones.$.name": zone.name } });
	},


	removeZone: function(devId, zoneId) {

		check(devId, String);
		check(zoneId, Match.Integer);

		Meteor.call('writeHistory', null, devid, 'Remove zone ' + zoneId);

		return Devices.update(devId, { $pull: { zones: { _id: zoneId } } });
	},


	setDeviceArmed: function(devId, isArmed) {

		check(devId, String);

		// return Devices.update({ _id: devId, "zones.isArmed": !isArmed },
		// 	{ $set: { "zones.$.isArmed": isArmed } });


		Devices.find(devId).forEach(function(device) {

			var zonesIds = [];

			device.zones.forEach(function(zone) {
				if (zone.isArmed !== isArmed) {
					zonesIds.push(zone._id);
				}
			})

			Meteor.call('writeHistory', null, device._id, isArmed ? 'Arm ' + zonesIds : 'Disarm ' + zonesIds);
			
			device.zones.forEach(function(zone) {
				Devices.update({ _id: devId, "zones._id": zone._id, zones: { $elemMatch: { isArmed: !isArmed }} }, { $set: { "zones.$.isArmed": isArmed }});
				//Meteor.call('setZoneArmed', devId, zone._id, isArmed);
			});
		});
	},


	setZoneArmed: function(devId, zoneId, isArmed) {

		check(devId, String);
		check(zoneId, Match.Integer);

		Meteor.call('writeHistory', null, devId, isArmed ? 'Arm ' + zoneId : 'Disarm ' + zoneId);

		return Devices.update({ _id: devId, "zones._id": zoneId },
			{ $set: { "zones.$.isArmed": isArmed } });
	}
});