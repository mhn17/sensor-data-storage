/**
 * app/repositories/nodeRepository.js
 */


/**
 * Dependencies
 */
var config = require('config');
var nano = require('nano')('http://' + config.dbConfig.host + ':' + config.dbConfig.port);

/**
 * NodeRepository constructor
 */
function NodeRepository() {	
	this.db = nano.db.use(config.dbConfig.dbName);
}

/**
 * Return all nodes with sensors
 * 
 * @param {function(nodes)} [callback] Optional callback function
 * @return {Array} nodes A list of nodes with their sensors
 * @api public
 */
NodeRepository.prototype.findAll = function(callback) {
	this.db.list(function(err, body) {
		if (err) {
			console.log(err);
			return [];
		}
		
		if (!callback){
			return body.rows;
		}
		
		callback(body.rows);
	});
};

/**
 * Add a new node
 * 
 * @param {Object} The node object to save
 * @param {function()} [callback] Optional callback function
 * @api public
 */
NodeRepository.prototype.add = function(node, callback) {
	this.db.insert(node, function(err) {
		if (err) {
			console.log('error inserting document: ' + node);
		}
		
		if (!callback) {
			return;
		}
		
		callback();
	});
};

/**
 * Module exports
 */
module.exports = NodeRepository;