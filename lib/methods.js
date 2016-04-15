Meteor.methods({

	writeHistory: function(userId, devId, info) {

		if (!this.userId) {
            throw new Meteor.Error('not-logged-in',
								   'Must be logged in before writing to history.');
        }

		return History.insert({
			at: new Date(),
			userId: userId,
			deviceId: devId,
			info: info
		});
	},


	newDevice: function(device) {

		if (!this.userId) {
            throw new Meteor.Error('not-logged-in',
								   'Must be logged in before creating a device.');
        }

		// TODO: check for gid validity
		check(device,
			{
				_id: String,
				name: Match.Maybe(String)
			}
		);

		if (device._id.length !== 12) {
			throw new Meteor.Error('device-gid-required',
								   'Valid device GID required');
		}

		var userId = this.userId;

		// Check if device already present in DB
		var d = Devices.findOne(device._id);

		if (!d) { // If device is not in DB, insert it with current user id.
			device.users = [{
				_id: this.userId
				// TODO: add user number
			}];
			return Devices.insert(device, function(error, result) {
				if (error) {
                    //code
                } else {
					Meteor.call('writeHistory', userId, device._id, 'New device');
				}
			});
        }

		// If device is already in DB, check if user already
		// added to this device
		for (i = 0; d.users && i < d.users.length; i++) {
            if (d.users[i]._id === this.userId) {
				return d._id;
            }
        }

		// If user is not added to present device, add him.
		Devices.update(d._id, {
			$push: {
				users: {
					_id: this.userId
					// TODO: add user number
				}
			}
		}, function(error, result) {
			if (error) {
                //code
            } else {
				Meteor.call('writeHistory', userId, device._id, 'User added');
			}
		});

		return d._id;
	},


	updateDevice: function(device) {

		if (!this.userId) {
            throw new Meteor.Error('not-logged-in',
								   'Must be logged in before updating a device.');
        }

		check(device,
			{
				_id: String,
				name: Match.Maybe(String)
			}
		);

		// Check if user is owning this device
		var d = Devices.findOne({ _id: device._id, "users._id": this.userId });

		if (!d) { // Don't update if user is not owning this device
            return;
        }

		var userId = this.userId;

		Devices.update({ _id: device._id, "users._id": this.userId },
					   { $set: { name: device.name } },
					   function(error, result) {
							if (error) {
                                //code
                            } else {
								Meteor.call('writeHistory',
											userId,
											device._id,
											'New name: ' + device.name);
							}
					   });
	},


	removeDevice: function(devId) {

		if (!this.userId) {
            throw new Meteor.Error('not-logged-in',
								   'Must be logged in before removing a device.');
        }

		check(devId, String);

		var userId = this.userId;

		// Check if user is owning this device
		var d = Devices.findOne({ _id: devId, "users._id": this.userId });

		if (!d) { // Don't remove if user is not owning this device
            return;
        }

		// Check if there're other users owning this device
		var dd = Devices.find(devId).fetch();

		var isMultiusers = false;

		for (i = 0; dd && dd.users && i < dd.users.length; i++) {
			if (dd.users[i]._id === userId) {
                continue;
            }
			isMultiusers = true;
			break;
		}

		if (isMultiusers) { // Remove user from device
			Devices.update(devId, {
				$pull: {
					users: {
						_id: userId
						// TODO: check user number
					}
				}
			}, function(error, result) {
				if (error) {
                    //code
                } else {
					Meteor.call('writeHistory', userId, devId, 'User removed');
				}
			});
        } else { // Remove device
			Devices.remove(devId, function(error) {
				if (error) {
					//code
				} else {
					Meteor.call('writeHistory', userId, devId, 'Device removed');
				}
			});
		}
	},


	updateZone: function(devId, zone) {

		if (!this.userId) {
            throw new Meteor.Error('not-logged-in',
								   'Must be logged in before updating a zone.');
        }

		check(devId, String);
		check(zone,
			{
				_id: Match.Integer,
				name: Match.Maybe(String)
			}
		);

		var userId = this.userId;

		// Check if user is owning this device
		var d = Devices.findOne({ _id: devId, "users._id": this.userId });

		if (!d) { // Don't update if user is not owning this device
            return;
        }

		Devices.update({ _id: devId, "zones._id": zone._id },
			{ $set: { "zones.$.name": zone.name } },
			function(error, result) {
				if (error) {
                    //code
                } else {
					Meteor.call('writeHistory', userId, devId,
						'New name for zone ' + zone._id + ': ' + zone.name);
				}
			});
	},


	removeZone: function(devId, zoneId) {

		if (!this.userId) {
            throw new Meteor.Error('not-logged-in',
								   'Must be logged in before removing a zone.');
        }

		check(devId, String);
		check(zoneId, Match.Integer);

		var userId = this.userId;

		// Check if user is owning this device
		var d = Devices.findOne({ _id: devId, "users._id": this.userId });

		if (!d) { // Don't remove if user is not owning this device
            return;
        }

		Devices.update(devId, { $pull: { zones: { _id: zoneId } } },
					   function(error, result) {
							Meteor.call('writeHistory', userId, devId,
										'Remove zone ' + zoneId);
					   });
	},


	setDeviceArmed: function(devId, isArmed) {

		if (!this.userId) {
            throw new Meteor.Error('not-logged-in',
								   'Must be logged in before using a device.');
        }

		check(devId, String);

		// return Devices.update({ _id: devId, "zones.isArmed": !isArmed },
		// 	{ $set: { "zones.$.isArmed": isArmed } });

		var userId = this.userId;

		// Check if user is owning this device
		var d = Devices.findOne({ _id: devId, "users._id": this.userId });

		if (!d) { // Don't act if user is not owning this device
            return;
        }

		Devices.find(devId).forEach(function(device) {

			if (device.zones) {

				var zonesIds = [];

				device.zones.forEach(function(zone) {
					if (zone.isArmed !== isArmed) {
						zonesIds.push(zone._id);
					}
				})

				Meteor.call('writeHistory', userId, device._id,
							isArmed ? 'Arm ' + zonesIds : 'Disarm ' + zonesIds);

				device.zones.forEach(function(zone) {
					//Meteor.call('setZoneArmed', devId, zone._id, isArmed);
					Devices.update({
						_id: devId,
						"zones._id": zone._id,
						zones: { $elemMatch: { isArmed: !isArmed }}
						},
						{ $set: { "zones.$.isArmed": isArmed }});
				});
			}

		});
	},


	setZoneArmed: function(devId, zoneId, isArmed) {

		if (!this.userId) {
            throw new Meteor.Error('not-logged-in',
								   'Must be logged in before managing a zone.');
        }

		check(devId, String);
		check(zoneId, Match.Integer);

		var userId = this.userId;

		// Check if user is owning this device
		var d = Devices.findOne({ _id: devId, "users._id": this.userId });

		if (!d) { // Don't act if user is not owning this device
            return;
        }

		Devices.update({ _id: devId, "zones._id": zoneId },
			{ $set: { "zones.$.isArmed": isArmed } },
			function(error, result) {
				Meteor.call('writeHistory', userId, devId,
					isArmed ? 'Arm ' + zoneId : 'Disarm ' + zoneId);
			});
	}
});
