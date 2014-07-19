// script for Tessel hackathon at Hack Reactor 07-19-2014

var tessel = require('tessel');
var camera = require('camera-vc-0706').use(tessel.port['A']);
var ambient = require('ambient-attx4').use(tessel.port['B']);
