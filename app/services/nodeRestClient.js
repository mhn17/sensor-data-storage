/**
 * app/services/nodeRESTClient.js
 */

/**
 * Dependencies
 */
var RestClient = require('node-rest-client').Client;
var util = require('util');

/**
 * NodeRestClient constructor
 */
function NodeRestClient() {
	this.restClient = new RestClient();
	this.httpArgs = {
			"headers": {}
	};
}

/**
 * Get a list of sensors for a sensor node
 * 
 * @param {String} nodeUrl The node's URL
 * @param {function()} callback Callback function
 * @return {Array} sensors A list of sensors
 * @api public
 */
NodeRestClient.prototype.getSensors = function(nodeUrl, callback) {
	var url = util.format("%s/sensors", nodeUrl);
	
	this.restClient.get(url, this.httpArgs, function(sensors, response) {
		if (response.statusCode !== 200) {
			console.log("Error reading sensors");
			
			callback([]);
		}
		
		callback(sensors);
	});
};

/**
 * Get all sensor data from a node for a sensor
 * 
 * @param {String} nodeUrl The node's URL
 * @param {String} sensorId The sensor ID
 * @param {int} offset The offset for the listing
 * @param {int} limit The number of records to get
 * @param {function()} callback Callback function
 * @return {Array} sensorData A list of all sensor data
 * @api public
 */
NodeRestClient.prototype.getSensorData = function(nodeUrl, sensorId, offset, limit, callback) {
	var url = util.format("%s/sensors/%s/sensorData?offset=%s&limit=%s",
							nodeUrl, sensorId, offset, limit);
	this.restClient.get(url, this.httpArgs, function(sensorData, response) {
		if (response.statusCode !== 200) {
			console.log("Error reading sensor data");

			callback([]);
		}

		callback(sensorData);
	});
};

/**
 * Delete a single sensor data record
 * 
 * @param {String} nodeUrl The node's URL
 * @param {String} sensorDataId The record ID to delete
 * @param {function()} callback Callback function 
 */
NodeRestClient.prototype.deleteSensorData = function(nodeUrl, sensorDataId, callback) {
	var url = util.format("%s/sensorData/%s", nodeUrl, sensorDataId);
	
	this.restClient.delete(url, this.httpArgs, function(data, response) {
		if (response.statusCode !== 204) {
			console.log("Error deleting sensor data");
		}

		if (typeof callback !== "undefined") {
			callback();
		}
	});
};

/**
 * Module exports
 */
module.exports = NodeRestClient;