#!/usr/bin/env node

var express = require('express');
var http = require('http')
var path = require('path');
var config = require('./config');
var utils = require('./utils');

var app = express();

app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('mixapp123456789987654321'));
	app.use(express.session());
	app.use(app.router);
	app.use(require('stylus').middleware(__dirname + '/public'));
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

var webserver = http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});

app.get('/', function (req, res){
	if( req.get('host') == 'ab.mixapp.be' ) return res.render('dummy'); // om nu ff te testen, mag weg later


	// http://stackoverflow.com/questions/8107856/how-can-i-get-the-users-ip-address-using-node-js
	var ip = req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress;

	console.log(ip);

	// je bent op de wifi als je ip dat van de AB is (moeten we nog zien uit te vissen wat dat is dinsdag):
	// maar normaal gezien mag je hier dan niet komen aangezien onze lokale DNS server jou naar een lokaal ip zou moeten gestuurd hebben,
	// maarja, je weet nooit
	var onwifi = (ip == config.abIP);

	// in dat geval sturen we je naar ab.mixlab.be die zowel op Amazon DNS als op onze lokale DNS zal verwijzen naar een lokaal ip (dat van de regie-app)
	if(onwifi) return res.redirect('http://ab.mixlab.be');


	res.render('index', {
		title: 'mixapp.be',
		ip: ip
	});
});

