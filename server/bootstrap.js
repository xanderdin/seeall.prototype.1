Meteor.startup(function() {
	
	if (Devices.find().count() !== 0) {
		return;
	}

	var devices = [
		{
			_id: '030400000001',
			name: 'Home',
			isOnline: true,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isFailure: false,
			isOff: false,
			//simBalance:
			zones: [
				{
					_id: 1,
					//type: 
					name: 'Door',
					//state:
					isArmed: false,
					isFired: false,					
					//isInAlarm: false,
					isTamperOpen: false,
					isBatteryLow: false,
					isPowerLost: false,
					isLinkLost: false,
					isFailure: false
				},
				{
					_id: 2,
					//type: 
					name: 'Entrance',
					//state:
					isArmed: false,
					isFired: false,					
					//isInAlarm: false,
					isTamperOpen: false,
					isBatteryLow: false,
					isPowerLost: false,
					isLinkLost: false,
					isFailure: false
				},
				{
					_id: 3,
					//type: 
					name: 'Living room',
					//state:
					isArmed: false,
					isFired: false,					
					//isInAlarm: false,
					isTamperOpen: false,
					isBatteryLow: false,
					isPowerLost: false,
					isLinkLost: false,
					isFailure: false
				},
				{
					_id: 4,
					//type: 
					name: 'Bed room',
					//state:
					isArmed: false,
					isFired: false,					
					//isInAlarm: false,
					isTamperOpen: false,
					isBatteryLow: false,
					isPowerLost: false,
					isLinkLost: false,
					isFailure: false
				}
			]
		},
		{
			_id: '030400000002',
			name: 'Garage',
			isOnline: true,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isFailure: false,
			isOff: false,
			//simBalance:
			zones: [
				{
					_id: 1,
					//type: 
					name: 'Gates',
					//state:
					isArmed: false,
					isFired: false,					
					//isInAlarm: false,
					isTamperOpen: false,
					isBatteryLow: false,
					isPowerLost: false,
					isLinkLost: false,
					isFailure: false
				},
				{
					_id: 2,
					//type: 
					name: 'Front',
					//state:
					isArmed: false,
					isFired: false,					
					//isInAlarm: false,
					isTamperOpen: false,
					isBatteryLow: false,
					isPowerLost: false,
					isLinkLost: false,
					isFailure: false
				},
				{
					_id: 3,
					//type: 
					name: 'Side',
					//state:
					isArmed: false,
					isFired: false,					
					//isInAlarm: false,
					isTamperOpen: false,
					isBatteryLow: false,
					isPowerLost: false,
					isLinkLost: false,
					isFailure: false
				},
				{
					_id: 4,
					//type: 
					name: 'Back',
					//state:
					isArmed: false,
					isFired: false,					
					//isInAlarm: false,
					isTamperOpen: false,
					isBatteryLow: false,
					isPowerLost: false,
					isLinkLost: false,
					isFailure: false
				}
			]
		},
		{
			_id: '030400000003',
			name: 'Office',
			isOnline: true,
			isTamperOpen: false,
			isBatteryLow: false,
			isPowerLost: false,
			isFailure: false,
			isOff: false,
			//simBalance:
			zones: [
				{
					_id: 1,
					//type: 
					name: 'Door',
					//state:
					isArmed: false,
					isFired: false,					
					//isInAlarm: false,
					isTamperOpen: false,
					isBatteryLow: false,
					isPowerLost: false,
					isLinkLost: false,
					isFailure: false
				},
				{
					_id: 2,
					//type: 
					name: 'Hall',
					//state:
					isArmed: false,
					isFired: false,					
					//isInAlarm: false,
					isTamperOpen: false,
					isBatteryLow: false,
					isPowerLost: false,
					isLinkLost: false,
					isFailure: false
				},
				{
					_id: 3,
					//type: 
					name: 'Room 1',
					//state:
					isArmed: false,
					isFired: false,					
					//isInAlarm: false,
					isTamperOpen: false,
					isBatteryLow: false,
					isPowerLost: false,
					isLinkLost: false,
					isFailure: false
				},
				{
					_id: 4,
					//type: 
					name: 'Conference room',
					//state:
					isArmed: false,
					isFired: false,					
					//isInAlarm: false,
					isTamperOpen: false,
					isBatteryLow: false,
					isPowerLost: false,
					isLinkLost: false,
					isFailure: false
				},
				{
					_id: 5,
					//type: 
					name: 'Floor 2 perimeter',
					//state:
					isArmed: false,
					isFired: false,					
					//isInAlarm: false,
					isTamperOpen: false,
					isBatteryLow: false,
					isPowerLost: false,
					isLinkLost: false,
					isFailure: false
				},
				{
					_id: 6,
					//type: 
					name: 'Secretary',
					//state:
					isArmed: false,
					isFired: false,					
					//isInAlarm: false,
					isTamperOpen: false,
					isBatteryLow: false,
					isPowerLost: false,
					isLinkLost: false,
					isFailure: false
				},
				{
					_id: 7,
					//type: 
					name: 'Boss',
					//state:
					isArmed: false,
					isFired: false,					
					//isInAlarm: false,
					isTamperOpen: false,
					isBatteryLow: false,
					isPowerLost: false,
					isLinkLost: false,
					isFailure: false
				},
				{
					_id: 8,
					//type: 
					name: 'Safe',
					//state:
					isArmed: false,
					isFired: false,					
					//isInAlarm: false,
					isTamperOpen: false,
					isBatteryLow: false,
					isPowerLost: false,
					isLinkLost: false,
					isFailure: false
				}
			]
		}
	];

	devices.forEach((device) => {
		Devices.insert(device);
	});

	//Devices.createIndex({'zones._id': 1}, { unique: true });
});