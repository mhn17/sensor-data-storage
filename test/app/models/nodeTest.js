/**
 * test/app/models/nodeTest.js
 */

/**
 * Dependencies
 */
var assert = require('assert');
var Node = require('../../../app/models/node.js');

describe('node model', function() {
	describe('creation', function() {
		it('should create Node model from a node DTO without sensors', function() {
			var nodeDto = {
					'id': '123456789',
					'name': 'node1',
					'url': 'http://localhost'
			};
			
			var node = new Node(nodeDto);
			assert.equal('123456789', node.id);
			assert.equal('node1', node.name);
			assert.equal('http://localhost', node.url);
			assert.equal(true, node.sensors.length === 0);
		});
		
		it('should create Node model from a node DTO with sensors', function() {
			var nodeDto = {
					'id': '123456789',
					'name': 'node1',
					'url': 'http://localhost',
					'sensors': [
					            {
					            	'id': 1,
					            	'name': 'sensor1'
					            },
					            {
					            	'id': 2,
					            	'name': 'sensor2'
					            }
					]
			};
			
			var node = new Node(nodeDto);
			assert.equal('123456789', node.id);
			assert.equal('node1', node.name);
			assert.equal('http://localhost', node.url);
			assert.equal(true, node.sensors.length === 2);
			assert.equal(1, node.sensors[0].id);
		});
	});
	
	describe('update sensors', function() {
		it('should add all new sensors when initial node sensors array is empty', function() {
			var nodeDto = {
					'id': '123456789',
					'name': 'node1',
					'url': 'http://localhost'
			};
			
			var sensors = [
			            {
			            	'id': 1,
			            	'name': 'sensor1'
			            },
			            {
			            	'id': 2,
			            	'name': 'sensor2'
			            }
			];
			
			var node = new Node(nodeDto);
			assert.equal(true, node.sensors.length === 0);
			
			node.updateSensors(sensors);
			assert.equal(true, node.sensors.length === 2);
			assert.equal('sensor1', node.sensors[0].name);
			assert.equal('sensor2', node.sensors[1].name);
		});
		
		it('should add all new sensors when initial node sensors array is not empty but sensors differ', function() {
			var nodeDto = {
					'id': '123456789',
					'name': 'node1',
					'url': 'http://localhost',
					'sensors': [
					            {
					            	'id': 1,
					            	'name': 'sensor1'
					            },
					            {
					            	'id': 2,
					            	'name': 'sensor2'
					            }
					]
			};
			
			var sensors = [
			            {
			            	'id': 3,
			            	'name': 'sensor3'
			            }
			];
			
			var node = new Node(nodeDto);
			assert.equal(true, node.sensors.length === 2);
			
			node.updateSensors(sensors);
			assert.equal(true, node.sensors.length === 3);
			assert.equal('sensor1', node.sensors[0].name);
			assert.equal('sensor2', node.sensors[1].name);
			assert.equal('sensor3', node.sensors[2].name);
		});
		
		it('should add on new sensor and update another', function() {
			var nodeDto = {
					'id': '123456789',
					'name': 'node1',
					'url': 'http://localhost',
					'sensors': [
					            {
					            	'id': 1,
					            	'name': 'sensor1'
					            },
					            {
					            	'id': 2,
					            	'name': 'sensor2'
					            }
					]
			};
			
			var sensors = [
			            {
			            	'id': 2,
			            	'name': 'sensor2new'
			            },
			            {
			            	'id': 3,
			            	'name': 'sensor3'
			            }
			];
			
			var node = new Node(nodeDto);
			assert.equal(true, node.sensors.length === 2);
			
			node.updateSensors(sensors);
			assert.equal(true, node.sensors.length === 3);
			assert.equal('sensor1', node.sensors[0].name);
			assert.equal('sensor2new', node.sensors[1].name);
			assert.equal('sensor3', node.sensors[2].name);
		});
	});
});