/**
 * app/models/sensorData.js
 */

/**
 * SensorData constructor
 * 
 * @param {Object} sensorDataDto A sensor data DTO which is mapped to this model
 */
function SensorData (sensorDataDto) {
	this._id = sensorDataDto._id;
	this._rev = sensorDataDto._rev;
	this.type = sensorDataDto.type ? sensorDataDto.type : "sensor-data";
	this.node_id = sensorDataDto.node_id;
	this.sensorId = sensorDataDto.sensorId;
	this.timestamp = sensorDataDto.timestamp;
	this.data = sensorDataDto.data;
}

/**
 * Get the sensor data ID
 * 
 * @returns {String} The sensor data ID
 */
SensorData.prototype.getId = function() {
	return this._id;
};

module.exports = SensorData;