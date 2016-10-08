/**
 * app/models/node.js
 */

/**
 * Dependencies
 */
var Sensor = require('./sensor');

/**
 * Node constructor
 * 
 * @param {Object} nodeDto A node DTO which is mapped to this model
 */
function Node(nodeDto) {
	this._id = nodeDto._id;
	this._rev = nodeDto._rev;
	this.type = nodeDto.type ? nodeDto.type : "node";
	this.name = nodeDto.name;
	this.url = nodeDto.url;
	this.sensors = [];
	
	if (Array.isArray(nodeDto.sensors)) {
		var self = this;
		nodeDto.sensors.forEach(function(sensorDto) {
			self.sensors.push(new Sensor(sensorDto));
		});
	}
}

/**
 * Return the node ID
 * 
 * @returns {String}
 */
Node.prototype.getId = function() {
	return this._id;
};

/**
 * Return the node name
 * 
 * @returns {String}
 */
Node.prototype.getName = function () {
	return this.name;
};

/**
 * Return the node URL
 * 
 * @returns {String}
 */
Node.prototype.getUrl = function () {
	return this.url;
};

/**
 * Return the list of sensors
 * 
 * @returns {Array}
 */
Node.prototype.getSensors = function() {
	return this.sensors;
};

/**
 * Update sensors for a node. Only new sensors are added and existing sensors are updated.
 * No sensors are deleted because they are needed for existing sensor data
 * 
 * @param {Array} sensors A new list of sensors
 */
Node.prototype.updateSensors = function(sensors) {
	var self = this;
		
	// iterate over new sensors and update the node's sensor array
	sensors.forEach(function(sensorDto) {
		var sensor = new Sensor(sensorDto);
		var replaced = false;
		
		// if sensor already exists, replace it
		for (var i=0; i<self.sensors.length; i++) {
			if (sensor.getId() === self.sensors[i].getId()) {
				self.sensors[i] = sensor;
				replaced = true;
				
				break;
			}
		}
		
		if (replaced === false) {
			self.sensors.push(sensor);
		}
	});
};

/**
 * Module exports
 */
module.exports = Node;