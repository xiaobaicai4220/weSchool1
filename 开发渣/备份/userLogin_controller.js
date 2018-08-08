var crypto = require('crypto');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var url = require('url');
function hashPW(pwd){
	return crypto.createHash('sha256').update(pwd).
		digest('base64').toString();
}
function urlToJson(req){
	let url_parts = url.parse(req.url,true);
	let query = url_parts.query;
	return query
}
function getToken(body){
	return hashPW(body.UserTel)+'.'+hashPW(body.UserPass);
};
function notExit(body){
	User.findOne({UserTel:body.UserTel})
	.exec(function(err,user){
		if(!user){
			return true;
		}else{
			return false;
		}
		if(err){
			console.log(err);
			return false;
		}
	})
}
/***
 *@name  用户注册
 *@input UserTel UserPass UserName
 *@output token
 ***/
exports.reg = function(req,res){
	console.log('尝试注册');
	res.set("Access-Control-Allow-Origin", "*");
	var body = urlToJson(req);
	let o = {};
	if(notExit(body)){
		var user = new User({'UserName':body.UserName});
		user.set('UserPass',hashPW(body.UserPass));
		user.set('UserTel',body.UserTel);
		user.save(function(err){
			if(err){
				console.log(err);
				o.type = 2;
			}else{
				console.log('插入数据'+JSON.stringify(body));
				o.type = 1;
			}
		})
	}else{
		o.type = 0;
	}
	res.send(JSON.stringify(o));
}
/***
 *@name 用户登录
 *@input  UserTel UserPass
 *@output token
 ***/
exports.login = function(req,res){
	var body = urlToJson(req);
	User.findOne({UserTel:body.UserTel})
	.exec(function(err,user){
		console.log('查找');
		if(!user){
			err='User Not Found.';
		}else if(user.UserPass === hashPW(body.UserPass.toString())){
			console.log("登录成功");
			res.send(getToken(body));
		}else{
			err = 'Authentication failed.';
		}
		if(err){
			console.log(err);
		}
	});
};
/***
 *@name  修改密码
 *@input UserTel OldUserPass UserPass
 *@output 'notFound'  'SaveErr'  token
 ***/
exports.update = function(req,res){
	console.log('正在修改密码')
	var body = urlToJson(req);
	User.findOne({UserTel:body.UserTel})
	.exec(function(err,user){
		if(!user){
			res.send('notFound');
		}else if(user.UserPass === hashPW(body.OldUserPass.toString())){
			user.set('UserPass',hashPW(body.UserPass));
			user.set('UserName',body.UserName);
			user.save(function(err){
				if(err){
					res.send('SaveErr');
				}else{
					console.log('修改成功');
					res.send(getToken(body));
				}
			})
		};
	});
};
exports.getUserProfile = function(req,res){
	User.findOne({_id:req.session.user})
	.exec(function(err,user){
		if(!user){
			res.json(404,{err:'User Not Found.'});
		}else{
			res.json(user);
		}
	});
};
exports.deleteUser = function(req,res){
	User.findOne({_id:req.session.user})
	.exec(function(err,user){
		if(user){
			user.remove(function(err){
				if(err){
					req.session.msg = err;
				}
				req.session.destroy(function(){
					res.redirect('/login');
				});
			});
		}else{
			req.session.msg = "User Not Found!";
			req.session.destroy(function(){
				res.redirect('/login');
			});
		}
	});
};