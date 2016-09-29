/**
 * app/services/dataCollector.js
 */

/**
 * Dependencies
 */
var NodeRestClient = require('./nodeRestClient');
var NodeRepository = require('../repositories/nodeRepository.js');
var async = require('async');

/**
 * DataCollector constructor
 */
function DataCollector() {
	this.sensorNodeClient = new NodeRestClient();
	this.nodeRepository = new NodeRepository();
	
	this.nodes = [];
	this.sensors = [];
	this.collectingData = false;
}

/**
 * Initializes the nodes and sensors
 * 
 * @api private
 */
DataCollector.prototype.start = function() {
	var self = this;

	this.nodeRepository.findAll(function(nodes) {
		self.nodes = nodes;
		self.updateSensors();
	});
};

/**
 * Update sensors for each node. Only new sensors are added and existing sensors are updated.
 * No sensors are deleted because they are needed for existing sensor data
 * 
 * @api private
 */
DataCollector.prototype.updateSensors = function() {
	var self = this;
	
	async.each(this.nodes, function(node, callback) {
		if (!Array.isArray(node.sensors)) {
			node.sensors = [];
		}
		
		self.sensorNodeClient.getSensors(node.url, function(sensors) {
			node.updateSensors(sensors);
			callback();
		});
	}, function(err) {
		if (err) {
			console.log('error: ' + err);
		} else {
			self.nodes.forEach(function(node) {
				self.nodeRepository.update(node, function() {
					console.log('node "' + node.getName() + '" upated');
				});
			});
		}
	});
};

/**
 * Module exports
 */
module.exports = DataCollector;