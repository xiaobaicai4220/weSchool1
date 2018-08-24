var crypto = require('crypto');
var express = require('express');
//var tokens = new Map();
module.exports = function(app){
	var login = require('./controllers/login_controller');
	var userInfo = require('./controllers/userInfo_controller');
	var address = require('./controllers/userAddress_controller');
	var jifen = require('./controllers/jiFen_controller');
	var bangyou = require('./controllers/bangyou_controller');
	
	app.use('/static',express.static('./static'));
	app.get('/',login.hello);
	
	
	app.post('/login/getCode',login.getCode);
	app.post('/login/veriLogin',login.veriLogin);
	app.post('/login/passLogin',login.passLogin);
	app.post('/login/regLogin',login.regLogin);
	
	app.post('/userInfo/updateHeaderImg',userInfo.updateHeaderImg);
	app.post('/userInfo/updateSignature',userInfo.updateSignature);
	app.post('/userInfo/updateUserInfo',userInfo.updateUserInfo);
	app.post('/userInfo/getOtherUserInfo',userInfo.getOtherUserInfo);
	app.post('/userInfo/getUserInfo',userInfo.getUserInfo);
	
	app.post('/address/add',address.add);
	app.post('/address/delete',address.delete);
	app.post('/address/update',address.update);
	app.post('/address/get',address.get);
	
	app.post('/jifen/create',jifen.create);
	app.post('/jifen/query',jifen.query);
	
	app.post('/bangyou/getList',bangyou.getList);
	app.post('/bangyou/put',bangyou.put);
	app.post('/bangyou/accept',bangyou.accept);
	app.post('/bangyou/del',bangyou.del);
	app.post('/bangyou/get/BS',bangyou.getBS);
	app.post('/bangyou/get/BI',bangyou.getBI);
	app.post('/bangyou/get/BE',bangyou.getBE);
	app.post('/bangyou/end/geter',bangyou.endGeter);
	app.post('/bangyou/end/puter',bangyou.endPuter);
}