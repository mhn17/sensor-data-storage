/**
 * app/models/sensor.js
 */

/**
 * Sensor constructor
 * 
 * @param {Object} sensorDto A sensor DTO which is mapped to this model
 */
function Sensor(sensorDto) {
	this.id = sensorDto.id;
	this.captureInterval = sensorDto.captureInterval;
	this.name = sensorDto.name;
}

/**
 * Return the sensor's ID
 * 
 * @returns {String}
 */
Sensor.prototype.getId = function() {
	return this.id;
};

/**
 * Return the sensor's name
 * 
 * @returns {String}
 */
Sensor.prototype.getName = function() {
	return this.name;
};

/**
 * Return the sensor's capture interval
 * 
 * @returns {int}
 */
Sensor.prototype.getCaptureInterval = function() {
	return this.captureInterval;
};

module.exports = Sensor;