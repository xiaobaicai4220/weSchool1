var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
//发布订单表
var BangyouInfoStartSchema = new Schema({
	code: {
		type: String
	},
	location: {
		type: String
	},
	time: {
		type: String
	},
	jifen: {
		type: String
	},
	isOfficial: {
		type: String
	},
	remarks: {
		type: String
	},
	address: {
		type: String
	},
	addressId: {
		type: String
	},
	putUserName: {
		type: String
	},
	putUserPhone: {
		type: String
	},
	putUserheaderImgUrl: {
		type: String
	},
	putTime: {
		type: String,
		index:1
	}
});
mongoose.model('BangyouInfoStart', BangyouInfoStartSchema);

//正在进行中的订单表
var BangyouInfoIngSchema = new Schema({
	code: {
		type: String
	},
	location: {
		type: String
	},
	time: {
		type: String
	},
	jifen: {
		type: String
	},
	isOfficial: {
		type: String
	},
	remarks: {
		type: String
	},
	address: {
		type: String
	},
	addressId: {
		type: String
	},
	userName: {
		type: String
	},
	putUserPhone: {
		type: String
	},
	userheaderImgUrl: {
		type: String
	},
	putTime: {
		type: String,
		index:1
	},
	getTime:{
		type:String
	},
	getUserName:{
		type:String
	},
	getUserPhone:{
		type:String
	},
	getUserHeadImgUrl:{
		type:String
	},
	endType:{
		type:Boolean
	}
});
mongoose.model('BangyouInfoIng', BangyouInfoIngSchema);

//已完成的订单表
var BangyouInfoEndSchema = new Schema({
	code: {
		type: String
	},
	location: {
		type: String
	},
	time: {
		type: String
	},
	jifen: {
		type: String
	},
	isOfficial: {
		type: String
	},
	remarks: {
		type: String
	},
	address: {
		type: String
	},
	addressId: {
		type: String
	},
	userName: {
		type: String
	},
	putUserPhone: {
		type: String
	},
	userheaderImgUrl: {
		type: String
	},
	putTime: {
		type: String,
		index:1
	},
	getTime:{
		type:String
	},
	getUserName:{
		type:String
	},
	getUserPhone:{
		type:String
	},
	getUserHeadImgUrl:{
		type:String
	},
	endType:{
		type:Boolean
	},
	endTime:{
		type:String
	},
});
mongoose.model('BangyouInfoEnd', BangyouInfoEndSchema);
