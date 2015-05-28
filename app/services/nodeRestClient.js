/**
 * app/services/nodeRESTClient.js
 */

/**
 * Dependencies
 */
var restClient = require('node-rest-client').Client;
var util = require('util');

/**
 * DataCollector constructor
 */
function NodeRestClient() {
	var httpArgs = {
			"headers": {}
	};
}

/**
 * Get a list of sensors for a sensor node
 * 
 * @param {String} url The node's URL
 * @param {function()} callback Callback function
 * @return {Array} sensors A list of sensors
 * @api public
 */
NodeRestClient.prototype.getSensors = function(url, callback) {
	this.restClient.get(util.format("%s/sensors", url), this.httpArgs, function(sensors, response) {
		if (response.statusCode !== 200) {
			console.log("Error reading sensors");
			
			callback([]);
		}
		
		callback(sensors);
	});
};

/**
 * Module exports
 */
module.exports = NodeRestClient;