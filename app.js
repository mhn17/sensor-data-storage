// app.js

// SETUP DATA COLLECTOR
//=============================================================================
var DataCollector = require('./app/services/dataCollector');
var dataCollector = new DataCollector();
dataCollector.start();

//// set up job for regular updates of the sensor data
//var schedule = require('node-schedule');
//var recurrenceRule = new schedule.RecurrenceRule();
//recurrenceRule.second = null;
//schedule.scheduleJob(recurrenceRule, function(){
//    collectData.updateSensorData();
//});


//SETUP SERVER
//=============================================================================
//var server = require('./app/server');
