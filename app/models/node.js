/**
 * app/models/node.js
 */

/**
 * Dependencies
 */
var async = require('async');

/**
 * Node constructor
 * 
 * @param {Object} nodeDto A node DTO which is mapped to this model
 */
function Node(nodeDto) {
	this.id = nodeDto.id;
	this.name = nodeDto.name;
	this.url = nodeDto.url;
	
	if (!Array.isArray(nodeDto.sensors)) {
		this.sensors = [];
	}
	else {
		this.sensors = nodeDto.sensors;
	}
}

/**
 * Update sensors for a node. Only new sensors are added and existing sensors are updated.
 * No sensors are deleted because they are needed for existing sensor data
 */
Node.prototype.updateSensors = function(sensors) {
	var self = this;
		
	// iterate over new sensors and update the node's sensor array
	sensors.forEach(function(sensor) {
		var replaced = false;
		
		// if sensor already exists, replace it
		for (var i=0; i<self.sensors.length; i++) {
			if (sensor.id == self.sensors[i].id) {
				self.sensors[i] = sensor;
				replaced = true;
				
				break;
			}
		}
		
		if (replaced == false) {
			self.sensors.push(sensor);
		}
	});
};

/**
 * Module exports
 */
module.exports = Node;