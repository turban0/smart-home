var mongoose = require('mongoose');
var Promise = require('bluebird');

var sensorSchema = mongoose.Schema({
        name        : String,
        type        : {
            type: String,
            enum : ['NONE','TEMPERATURE']
        },
        switchable  : Boolean,
        address     : String,
        addressType : {
            type: String,
            enum : ['MAC','IP']
        }
    });

var Sensor = mongoose.model('Sensor', sensorSchema);
Promise.promisifyAll(Sensor);
Promise.promisifyAll(Sensor.prototype);

module.exports = Sensor;