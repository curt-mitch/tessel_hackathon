// script for Tessel hackathon at Hack Reactor 07-19-2014

var tessel = require('tessel');
var ambient = require('ambient-attx4').use(tessel.port['A']);
var camera = require('camera-vc0706').use(tessel.port['B']);

var http = require('http');
var fs = require('fs');

ambient.on('ready', function(){
	ambient.setSoundTrigger(0.0015);
	console.log('ambient ready');

	ambient.on('sound-trigger', function(data){
		console.log('Heard a loud sound!');
		console.log(data);
		ambient.clearSoundTrigger(function() {
			capturePics();
		});
	});
});

var capturePics = function(){
	var totalNumPics = 1;
	var fileRoot = '/app/hackathon/';
	for(var i=0; i < totalNumPics; i++){
		setTimeout(function(){
			camera.takePicture(function(err, image){
				if(err) {
					console.log('error taking image',err);
				} else {
					var name = 'picture-' + Date().split(" ").join("") + '.jpg';
					console.log('Picture saving as', name, '...');
					process.sendfile(name, image);
					console.log('done.');
					fs.readFile(fileRoot + name, function(err, data){
						console.log('readFile called');
						if(err) {
							throw err;
						} else {
							console.log('readFile else');
							postPic(data, name);
						}
					});
					// Turn the camera off to end the script
					camera.disable();
				}
			});
		}, 3000);
	}
};

// host and path for dropbox picture folder
// api-content.dropbox.com
// '/1/files_put/auto/dxpkxkoug3rwvaq/AADB3PRWBFI1GJb7C-Ffu7mga/' + name

var postPic = function(picture, name) {
	console.log('postPic called');
	var post_options = {
		host: 'localhost',
		port: '3000',
		path: '/dropbox',
		method: 'POST',
		headers: {
			'Content-Type': 'image/jpg',
			'Content-Length': picture.length
		}
	};

	// Set up the request
	var post_req = http.request(post_options, function(res) {
		console.log('post_req started');
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			console.log('Response: ' + chunk);
		});
	});

	// post the data
	post_req.write(picture);
	post_req.end();
};
