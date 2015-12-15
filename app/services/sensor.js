var Promise = require('bluebird');
var Sensor = require('../models/sensor');

module.exports = {
	get: function(id){
		return Sensor.findOneAsync({'id': id});
	},
	getAll: function(id){
		return Sensor.findAsync();
	},
	put: function(sensor) {
		var newSensor = new Sensor();
		newSensor.name = sensor.name;
        newSensor.type = sensor.type;
		newSensor.switchable = sensor.switchable;
		newSensor.address = sensor.address;
		newSensor.addressType = sensor.addressType;
        return newSensor.saveAsync();
	},
	update: function(id, sensor){
		return Sensor.findOneAndUpdate({'id': id}, sensor, {upsert:true})
	},
	remove: function(id){
		return Sensor.remove({'id': id});
	},
}

