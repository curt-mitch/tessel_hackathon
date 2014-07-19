// script for Tessel hackathon at Hack Reactor 07-19-2014

var tessel = require('tessel');
var camera = require('camera-vc0706').use(tessel.port['A']);
var ambient = require('ambient-attx4').use(tessel.port['B']);

ambient.on('ready', function(){
	ambient.setSoundTrigger(0.15);

	ambient.on('sound-trigger', function(data){
		console.log('Heard a loud sound!');
		console.log(data);
	});
});