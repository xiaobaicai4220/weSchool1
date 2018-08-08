var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var UserToken = new Schema({
	token:{
		type:String,
		unique:true,
		index:1
	},
	phone:{
		type:String,
	}
});
mongoose.model('UserToken',UserToken);