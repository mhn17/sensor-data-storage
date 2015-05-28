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
	
	// set nodes and sensors
	this.init();
}

/**
 * Initializes the nodes and sensors
 * 
 * @api private
 */
DataCollector.prototype.init = function() {
	var self = this;

	self.nodeRepository.findAll(function(nodes) {
		self.nodes = nodes;
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
	
	async.each(this.nodes,function(node) {
		if (!Array.isArray(node.sensors)) {
			node.sensors = [];
		}
		
		self.nodeRestClient.getSensors(node.url, function(sensors) {
			node.updateSensors(sensors);
		});
	});
};

/**
 * Module exports
 */
module.exports = DataCollector;