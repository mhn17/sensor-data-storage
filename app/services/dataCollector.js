/**
 * app/services/dataCollector.js
 */

/**
 * Dependencies
 */
var async = require('async');
var NodeRestClient = require('./nodeRestClient');
var NodeRepository = require('../repositories/nodeRepository.js');
var SensorDataRepository = require('../repositories/sensorDataRepository.js');
var SensorData = require('../models/sensorData');

/**
 * DataCollector constructor
 */
function DataCollector() {
	this.sensorNodeClient = new NodeRestClient();
	this.nodeRepository = new NodeRepository();
	this.sensorDataRepository = new SensorDataRepository();
	
	this.nodes = [];
	this.sensors = [];
	this.collectingData = false;
}

/**
 * Initializes the nodes and sensors
 * 
 * @param {function()} callback Callback function
 * @api private
 */
DataCollector.prototype.start = function(callback) {
	var self = this;

	this.nodeRepository.findAll(function(nodes) {
		self.nodes = nodes;
		self.updateSensors(callback);
	});
};

/**
 * Update sensors for each node. Only new sensors are added and existing sensors are updated.
 * No sensors are deleted because they are needed for existing sensor data
 * 
 * @param {function()} callback Callback function
 * @api private
 */
DataCollector.prototype.updateSensors = function(callback) {
	var self = this;
	
	async.each(this.nodes, function(node, nodesCallback) {		
		self.sensorNodeClient.getSensors(node.getUrl(), function(sensors) {
			node.updateSensors(sensors);
			nodesCallback();
		});
	}, function(err) {
		if (err) {
			console.log('error while updating sensors: ' + err);
			callback(err);
		} else {
			self.nodes.forEach(function(node) {
				self.nodeRepository.update(node, function() {
					console.log('node "' + node.getName() + '" upated');
					callback();
				});
			});
		}
	});
};

/**
 * Collect the sensor data from all nodes and their sensors and save it in
 * the database. After successfully saving the data, delete the data on the
 * node.
 * 
 * @api private
 */
DataCollector.prototype.collectSensorData = function() {
	if (this.collectingData === false) {
		this.collectingData = true;
	
		var self = this;

		// iterate over all nodes
		async.each(this.nodes, function (node, callbackNodes) {

			// iterate over all sensors for a node
			async.each(node.getSensors(), function (sensor, callbackSensors) {
				self.getAndSaveSensorData(node, sensor, callbackSensors);
			}, function (err) {
				console.log("finished importing sensor data");
				if (err) {
					console.log('error: ' + err);
				}

				callbackNodes();
			});
		}, function (err) {
			if (err) {
				console.log('error: ' + err);
			}
			
			self.collectingData = false;
		});
	
	}
};

/**
 * Get the sensor data from the node and store it in the database.
 * 
 * @param {Node} node
 * @param {Sensor} sensor
 * @param {function()} callbackGetAndSaveData Callback function
 * @returns {undefined}
 */
DataCollector.prototype.getAndSaveSensorData = function(node, sensor, callbackGetAndSaveData) {	
	var limit = 20;
	var offset = 0;
	var self = this;
	
	// get all data for a sensor
	this.sensorNodeClient.getSensorData(node.getUrl(), sensor.getId(), offset, limit,
		function (sensorData) {
			// while there was still data on the node, add it to the database and try to get the rest
			if (sensorData.length > 0) {
				async.each(sensorData, function(sensorDataDto, sensorDataCallback) {
					sensorDataDto._id = sensorDataDto.id;
					sensorDataDto.node_id = node.getId();
					var sensorDataModel = new SensorData(sensorDataDto);
					console.log("adding sensor data to DB: ", sensorDataModel.getId());
					self.sensorDataRepository.add(sensorDataModel, function(err) {
						if (typeof err === "undefined") {
							console.log("deleting remote sensor data: ", sensorDataModel.getId());
							
							// deleteSensorData without callback, just fire and forget
							self.sensorNodeClient.deleteSensorData(
								node.getUrl(), 
								sensorDataModel.getId(),
								sensorDataCallback
							);
						} else {
							console.log("error while adding sensor data: ", err);
							sensorDataCallback();
						}

					});
				}, function() {
					// get more sensor data from the node if there still exists some
					self.getAndSaveSensorData(node, sensor, callbackGetAndSaveData);
				});
			} else {
				callbackGetAndSaveData();
			}
		}
	);
};

/**
 * Return if it is currently busy collecting data
 * 
 * @returns {Boolean}
 */
DataCollector.prototype.isCollectingData = function() {
	return this.collectingData;
};

/**
 * Module exports
 */
module.exports = DataCollector;