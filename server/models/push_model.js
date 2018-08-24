var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
var PushSchema = new Schema({
	phone:{
		type:String,
		unique:true,
		index:1
	},
	list:{
		type:String
	}
});

mongoose.model('Push',PushSchema)
