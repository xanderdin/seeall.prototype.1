Meteor.publish('devices', function() {
    return Devices.find({ "users._id": this.userId });
});


//Meteor.publish('history', function() {
//    return History.find({ userId: this.userId });
//});


Meteor.publishComposite('history', function(){

    if (!this.userId) {
        return;
    }

    return {
        find() {
            return Devices.find({ "users._id": this.userId });
        },
        children: [
            {
                find(device) {
                    return History.find({ deviceId: device._id, });
                }
            }
        ]
    };
});


Meteor.publishComposite('users', function(devId) {

    if (!this.userId) {
        return;
    }

    return {
        find() {
            return Devices.find({ _id: devId, "users._id": this.userId });
        },
        children: [
            {
                collectionName: 'deviceUsers',

                find(device) {

                    var ids = [];

                    if (device.users) {
                        for (i = 0; i < device.users.length; i++) {
                            ids.push(device.users[i]._id);
                        }
                    }

                    const query = { _id: { $in: ids } };
                    const options = { fields: { username: 1 } };

                    return Meteor.users.find(query, options);
                }
            }
        ]
    };
});
