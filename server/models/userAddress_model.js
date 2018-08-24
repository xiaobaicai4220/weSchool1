var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var UserAddressSchema = new Schema({
	phone:{
		type:String,
		index:1
	},
	Aname:{
		type:String,
	},
	Aphone:{
		type:String,
	},
	Aaddress:{
		type:String
	},
	AaddressDetail:{
		type:String
	},
	isDefault:{
		type:Boolean
	}
});
mongoose.model('UserAddress',UserAddressSchema)