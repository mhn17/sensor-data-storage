/**
 * app/services/dbInit.js
 */

/**
 * Dependencies
 */
var config = require('config');
var nano = require('nano')('http://' + config.dbConfig.host + ':' + config.dbConfig.port);

/**
 * DbInit Constructor
 */
function DbInit() {
	this.db = nano.use(config.dbConfig.dbName);
	return this;
};

/**
 * Check if database exists and is set up correctly. Otherwise create db and all
 * necessary documents
 * 
 * @param {function()} dbInitCallback Callback function
 */
DbInit.prototype.init = function(dbInitCallback) {	
	var self = this;
	
	this.db.view('nodes', 'all', {}, function(error, body) {
		if (error) {
			// database does not exist
			if (error.message === 'no_db_file') {
				// create database
				nano.db.create(config.dbConfig.dbName, function (error) {
					if (error) {
						throw new Error("error initializing db: could not create database");
					}
					self.addAllNodesView(dbInitCallback);
				});
			} else {
				self.addAllNodesView(dbInitCallback);				
			}
		} else {
			dbInitCallback();
		}
	});

};

/**
 * 
 * @param {function()} addAllNodesViewCallback Callback function
 */
DbInit.prototype.addAllNodesView = function(addAllNodesViewCallback) {
	var view = {
		"_id": "_design/nodes",
		"language": "javascript",
		"views": { 
			"all": { 
				"map": "function(doc) { if (doc.type && doc.type == 'node') { emit(doc._id, null); }}"
			} 
		}
	};
	
	this.db.insert(view, function(error) {
		if (error) {
			throw new Error("error initializing db: could not add all nodes view");
		}
		
		addAllNodesViewCallback();
	});
};

module.exports = DbInit;