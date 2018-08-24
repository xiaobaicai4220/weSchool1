require('../models/userAddress_model.js');
var mongoose = require('mongoose');
var UserAddress = mongoose.model('UserAddress');
var Tokens = require('./token_controller.js');


module.exports = {
	get(req,res){
		let phone = Tokens.getPhone(req.body.token);
		if(phone){
			UserAddress.find({'phone':phone})
			.exec(function(err,userAddress){
				if(err){
					console.log(err);
				}
				if(!userAddress){
					res.send({type:1});
					return;
				}else{
					let list = {}
					let j = 1;
					for(i of userAddress){
						list[j++] = i;
					}
					res.json({type:0,list:list})
				}
			})
		}else{
			res.json({type:2})
		}
	},
	add(req,res){
		let phone = Tokens.getPhone(req.body.token);
		if(phone){
			var userAddress = new UserAddress({'phone':phone});
			userAddress.set('Aname',req.body.address.Aname);
			userAddress.set('Aphone',req.body.address.Aphone);
			userAddress.set('Aaddress',req.body.address.Aaddress);
			userAddress.set('AaddressDetail',req.body.address.AaddressDetail);
			userAddress.set('isDefault',req.body.address.isDefault);
			userAddress.save(function(err,userAddress){
				if(err){
					consle.log(err);
				}
				res.json({type:0,id:userAddress._id});
				return;
			})
		}else{
			res.json({type:1})
			return;
		}
	},
	delete(req,res){
		let phone = Tokens.getPhone(req.body.token);
		if(phone){
			User,find({'phone':phone,'_id':req.body.id})
			.exec(function(err,userAddress){
				if(err){
					console.log(err);
					res.json({type:2})
					return;
				}
				if(!userAddress){
					console.log();
					res.json({type:1})
					return
				}
				userAddress.remove(function(err){
					if(err){
						console.log(err);
						res.json({type:2});
						return;
					}
					res.json({type:0});
					return;
				})
			})
		}else{
			res.json({type:2})
		}
	},
	update(req,res){
		let phone = Tokens.getPhone(req.body.phone);
		if(phone){
			UserAddress.find({'phone':phone,'_id':req.body.id})
			.exec(function(err,userAddress){
				if(err){
					console.log(err);
					res.json({type:2})
				}
				if(!userAddress){
					//res.json({type:2})
					//不存在,新建该地址
					var userAddress = new UserAddress({'phone':phone});
					userAddress.set('Aname',req.body.address.Aname);
					userAddress.set('Aphone',req.body.address.Aphone);
					userAddress.set('Aaddress',req.body.address.Aaddress);
					userAddress.set('AaddressDetail',req.body.address.AaddressDetail);
					userAddress.set('isDefault',req.body.address.isDefault);
					userAddress.save(function(err,userAddress){
					if(err){
						console.log(err);
						res.json({type:2});
						return
					}
					res.json({type:1,id:userAddress._id})
					return;
				})
					return;
				}
				userAddress.set('Aname',req.body.address.Aname);
				userAddress.set('Aphone',req.body.address.Aphone);
				userAddress.set('Aaddress',req.body.address.Aaddress);
				userAddress.set('AaddressDetail',req.body.address.AaddressDetail);
				userAddress.set('isDefault',req.body.address.isDefault);
				userAddress.save(function(err){
					if(err){
						console.log(err);
						res.json({type:2});
						return
					}
					res.json({type:0})
					return;
				})
			})
		}else{
			res.json({type:2});
			return
		}
	}
}
