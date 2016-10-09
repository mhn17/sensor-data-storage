// app.js

// REQUIRE AND CONSTRUCT ALL DEPENDENCIES
//==============================================================================
var schedule = require('node-schedule');
var DbInit = require('./app/services/dbInit');
var DataCollector = require('./app/services/dataCollector');

var dbInit = new DbInit();
var dataCollector = new DataCollector();


// INITIALIZE DATABASE
//==============================================================================
dbInit.init(function() {
	// SETUP SCHEDULER FOR COLLECTING DATA
	//==========================================================================
	// set up job for regular updates of the sensor data
	// run every minute
	var rule = '* * * * *';
	
	// SETUP DATA COLLECTOR
	//==========================================================================
	dataCollector.start(function(err) {
		if (typeof err === "undefined") {
			// immediatly start collect data
			dataCollector.collectSensorData();
			
			// schedule job for collecting data
			schedule.scheduleJob(rule, function () {
				if (!dataCollector.isCollectingData()) {
					dataCollector.collectSensorData();		
				}
			});
		}
	});
});