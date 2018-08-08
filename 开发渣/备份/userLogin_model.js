var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var UserSchema = new Schema({
	UserName:{
		type:String
	},
	UserTel:{
		type:String,
		unique:true,
		index:1
	},
	UserPass:String,
});
mongoose.model('User',UserSchema);