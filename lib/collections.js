Devices = new Mongo.Collection('devices');
History = new Mongo.Collection('history');

if (Meteor.isClient) {
    // This is a virtual collection from Meteor.publishComposite.
    DeviceUsers = new Meteor.Collection('deviceUsers');
}
