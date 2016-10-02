// app.js

// SETUP SCHEDULER FOR COLLECTING DATA
//=============================================================================
// set up job for regular updates of the sensor data
var schedule = require('node-schedule');
// run every minute
var recurrenceRule = new schedule.RecurrenceRule();
recurrenceRule.second = null;

// SETUP DATA COLLECTOR
//=============================================================================
var DataCollector = require('./app/services/dataCollector');
var dataCollector = new DataCollector();
dataCollector.start(function(err) {
	if (typeof err === "undefined") {
		schedule.scheduleJob(recurrenceRule, function () {
			dataCollector.collectSensorData();		
		});
	}
});

//SETUP SERVER
//=============================================================================
//var server = require('./app/server');
