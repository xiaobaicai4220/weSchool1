var crypto = require('crypto');
var express = require('express');
module.exports = function(app){
	function passLogin(req,res){
		if(req.body){
			console.log(req.body);
		}else{
			console.log("hello");
		}
		res.status(200).json({token:"123353546464vdfdscz"});
	}
	
	var users = require('./controllers/userLogin_controller');
	app.use('/static',express.static('./static'));
	app.get('/',function(req,res){
		res.send('helloworld');
	})
	app.post('/user/reg',users.reg);
	app.post('/user/passLogin',passLogin);
	app.post('/user/update',users.update);
}