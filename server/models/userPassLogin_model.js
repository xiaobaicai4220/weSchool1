var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var UserPassLoginSchema = new Schema({
	phone:{
		type:String,
		unique:true,
		index:1
	},
	pass:{
		type:String,
	}
});
mongoose.model('UserPassLogin',UserPassLoginSchema)
