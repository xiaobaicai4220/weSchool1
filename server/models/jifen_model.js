/**
 * 用户积分表
 * 用于保存用户积分
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var JiFenSchema = new Schema({
	phone:{
		type:String,
		unique:true,
		index:1
	},
	jifen:{
		type:String
	}
});

mongoose.model('JiFen',JiFenSchema)