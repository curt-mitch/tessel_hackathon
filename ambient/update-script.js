var tessel = require('tessel');
var ambientLib = require('ambient-attx4');

ambientLib.updateFirmware( tessel.port['B'], 'node_modules/ambient-attx4/firmware/src/ambient-attx4.hex');