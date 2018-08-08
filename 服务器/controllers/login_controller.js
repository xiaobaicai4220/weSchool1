var crypto = require('crypto');
require('../models/userPassLogin_model.js');
var mongoose = require('mongoose');
var UserPassLogin = mongoose.model('UserPassLogin');
var Tokens = require('./token_controller.js');
var UserInit = require('./userInit_controller.js');

var codes = new Map();

function hashPW(pwd){
	return crypto.createHash('sha256').update(pwd).
		digest('base64').toString();
}

function createCode(){
	var a = Math.floor(Math.random()*1000000)
	return a>100000?a:createCode();
}

function getToken(phone,pass){
	var token = hashPW(phone)+'.'+hashPW(pass);
	tokens.set(token,phone)
	console.log('保存用户token');
	console.log('当前token');
	console.log(tokens);
	//将token保存到数据库中
	
	return token;
};

module.exports = {
	hello(req,res){
		res.send('helloworld');
		console.log('helloworld');
	},
	getCode(req,res){
		console.log("getCode");
		if(req.body.phone){
			let a = createCode();
			codes.set(req.body.phone,a)
			console.log('用户'+req.body.phone+'获取验证码'+a);
			res.json({type:0,code:a});
		}else{
			res.json({type:1,msg:"no phone!"});
		}
	},
	veriLogin(req,res){
		if(req.body.phone){
			if(codes.get(req.body.phone) == req.body.veri){
				//验证账号是否存在,
				UserPassLogin.findOne({'phone':req.body.phone})
				.exec(function(err,userPassLogin){
					if(err){
						console.log(err)
					}
					if(!userPassLogin){
						//如果账号不存在,登录失败
						res.json({type:2});
						res.end();
						return;
					}
					console.log('用户'+req.body.phone+'验证码登录');
					codes.delete(req.body.phone);
					res.json({type:0,token:Tokens.getToken(req.body.phone,req.body.veri)});
				})
			}else{
				res.json({type:1})
			}
		}else{
			res.json({type:3})
		}
	},
	passLogin(req,res){
		UserPassLogin.findOne({'phone':req.body.phone})
		.exec(function(err,userPassLogin){
			//console.log(req.body);
			//console.log(userPassLogin);
			if(!userPassLogin){
				res.json({type:1})
			}else{
				if(userPassLogin.pass === hashPW(req.body.pass)){
					console.log('用户'+req.body.phone+'密码登录');
					res.json({type:0,token:Tokens.getToken(req.body.phone,req.body.pass)})
				}else{
					res.json({type:2,})
				}
			}
			if(err)
				console.log(err);
		})
	},
	regLogin(req,res){
		if(req.body.phone && codes.get(req.body.phone) == req.body.veri){
			codes.delete(req.body.phone);
			UserPassLogin.findOne({'phone':req.body.phone})
			.exec(function(err,userPassLogin){
				if(userPassLogin){
					res.json({type:2})
				}else{
					var userPassLogin = new UserPassLogin({'phone':req.body.phone});
					userPassLogin.set('pass',hashPW(req.body.pass));
					userPassLogin.save(function(err){
						if(!err){
							console.log('数据库插入新数据:'+req.body.phone+' '+req.body.pass+hashPW(req.body.pass));
							console.log('用户'+req.body.phone+'验证码注册加登录');
							res.json({type:0,token:Tokens.getToken(req.body.phone,req.body.pass)});
							//初始化用户数据
							UserInit.userInit(req.body.phone);
						}else{
							res.json({type:1})
							console.log(err);
						}
					})
				}
			});
		}else{
			res.json({type:1})
		}
	}
}
			
			
		