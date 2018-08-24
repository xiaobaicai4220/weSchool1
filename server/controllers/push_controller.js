require('../models/push_model.js');
const mongoose = require('mongoose');
const Push = mongoose.model('Push');
const Tokens = require('./token_controller.js');

var Pushs = new Map();

/*push字典初始化
 * 从数据库中取出push
 */
function pushInit(){
	Push.find({})
	.exec(function(err,doc){
		if(err){
			console.log(err);
			return;
		}
		if(!doc){
			console.log("pushs数据库为空");
			console.log(push);
			return;
		}
		for(let i =0;i<doc.length;i++){
			Pushs.set(doc[i].phone,JSON.parse(doc[i].list));
			console.log("从pushs数据库中提取"+doc[i]);
		}
		console.log("提取完毕，当前Pushs表");
		console.log(Pushs);
		return;
	})
}

/*push字典终止
 * 将Pushs数据保存到数据库中
 */
function keepOne(){
	
}
function keepAll(){
	
}

/*
 * 接口
 */
module.exports = {
	//客户端轮训接口
	poll(req,res){
		if(req.)
	}
}
