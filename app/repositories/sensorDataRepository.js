/**
 * app/repositories/sensorDataRepository.js
 */

/**
 * Dependencies
 */
var config = require('config');
var nano = require('nano')('http://' + config.dbConfig.host + ':' + config.dbConfig.port);

/**
 * SensorDataRepository constructor
 */
function SensorDataRepository() {	
	this.db = nano.db.use(config.dbConfig.dbName);
}

/**
 * Add a new record for sensor data
 * 
 * @param {Object} sensorData The sensor data object to save
 * @param {function()} [callback] Callback function
 * @api public
 */
SensorDataRepository.prototype.add = function(sensorData, callback) {
	var self = this;
	
	// make sure the data does not already exist in the DB
	this.db.get(sensorData.getId(), function(err) {
		if (err) {
			// sensor does not exist
			if (err.statusCode === 404) {
				self.db.insert(sensorData, function (err) {
					if (err) {
						console.log('error inserting document: ' + sensorData);
						callback(err);
					}

					callback();
				});
			} else {
				console.log(err);
			}
		} else {
			// sensor data already exists
			callback();
		}
	});
};


/**
 * Module exports
 */
module.exports = SensorDataRepository;