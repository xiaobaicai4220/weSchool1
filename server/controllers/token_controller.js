var crypto = require('crypto');
require('../models/userToken_model.js');
var mongoose = require('mongoose');
var UserToken = mongoose.model('UserToken');

function hashPW(pwd){
	return crypto.createHash('sha256').update(pwd).
		digest('base64').toString();
}

var tokens = new Map();  //tokens   在内存中保存tokens队列,加速查找速度
var tokensAdd = new Map();	//tokensAdd  保存新增的token, 定时加到数据库中,

//向tokens中添加一个测试例子
tokens.set('duniahfuheaof','18861855098');


//初始化token
function tokensInit(){
	var query = UserToken.find({},{});
	query.exec(function(err,docs){
		for(var i in docs){
			console.log(docs[i]);
			tokens.set(docs[i].token,docs[i].phone);
		}
	})
	/*
	UserToken.findAll({},{})
	.exec(function(err,userTokens){
		console.log(JSON.stringify(userTokens));
	})*/
}
tokensInit();


/*tokens的持久化存储 保存到数据库中
setInterval(function(tokensAdd){
	tokensAdd.forEach(function(phone,token){
		let usertoken = new UserToken({'token':token,'phone':phone});
		usertoken.save(function(err){
			if(err){
				console.log(err);
			}
			console.log('向数据库中插入数据'+'token: '+token+' phone'+phone);
		});
		tokensAdd.delete(token);
	})
},60*1000)
*/
module.exports = {
	getToken(phone,pass){
		var token = hashPW(phone)+'.'+hashPW(pass);
		tokens.set(token,phone)
		//将用户token保存到数据库中
		let userToken = new UserToken({'token':token})
		userToken.set('phone',phone);
		userToken.save(function(err){
			if(err){
				console.log("数据保存失败")
			}else{
				console.log('保存用户token');
				console.log('当前token');
				console.log(tokens);
			}
		})
		
		console.log('保存用户token');
		console.log('当前token');
		console.log(tokens);
		return token;
	},
	getPhone(token){
		return tokens.get(token);
	},
	deleteToken(token){
		if(tokens.has(token)){
			tokens.delete(token);
			return true;
		}
		return false;
	}
}
