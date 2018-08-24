require('../models/bangyouInfo_model.js');
const mongoose = require('mongoose');
const BangyouInfoStart = mongoose.model('BangyouInfoStart');
const BangyouInfoIng = mongoose.model('BangyouInfoIng');
const BangyouInfoEnd = mongoose.model('BangyouInfoEnd');
const Tokens = require('./token_controller.js');
const socket = require('../socket.js');

//订单有效性验证
function variOrder() {
	return;
}

function extend(target, source) {
	for(let property in source) {
		target[property] = source[property];
	}
	return target;
}

module.exports = {
	put(req, res) {
		let phone = Tokens.getPhone(req.body.token);
		if(phone) {
			let bs = new BangyouInfoStart({
				'putUserPhone': phone
			});
			//设置发布人基本资料
			bs.set('putUserName', req.body.putUserName);
			bs.set('putUserheaderImgUrl', req.body.putUserHeaderImgUrl);
			//设置发布时间
			bs.set('putTime', (new Date()).getTime().toString());
			//设置订单信息
			bs.set('code', req.body.bangyouInfo.code);
			bs.set('location', req.body.bangyouInfo.location);
			bs.set('time', req.body.bangyouInfo.time);
			bs.set('jifen', req.body.bangyouInfo.jifen);
			bs.set('isOfficial', req.body.bangyouInfo.isOfficial);
			bs.set('remarks', req.body.bangyouInfo.remarks);
			bs.set('address', req.body.bangyouInfo.address);
			bs.set('addressId', req.body.bangyouInfo.addressId);
			bs.save(function(err, bs) {
				if(err) {
					console.log(err);
					res.json({
						type: 1
					});
				}
				console.log("发布帮柚订单成功")
				console.log(bs);
				res.json({
					type: 0
				});
			})
		} else {
			res.json({
				type: 1
			})
		}
	},
	getList(req, res) {
		let phone = Tokens.getPhone(req.body.token);
		if(phone) {
			BangyouInfoStart.find({}).limit(10).lt('putTime', req.body.time)
				.exec(function(err, bs) {
					if(err) {
						console.log(err);
						res.json({
							type: 2
						});
						return;
					}
					if(!bs[0]){
						res.json({'type':1});
						return;
					}
					res.json({
						'type': 0,
						'list': bs
					});
					return;
				})
		} else {
			res.json({
				type: 2
			});
			return;
		}
	},
	accept(req, res) {
		let phone = Tokens.getPhone(req.body.token);
		if(phone) {
			//接受指定的ID的帮柚订单
			BangyouInfoStart.findOne({
					'_id': req.body._id
				})
				.exec(function(err, bs) {
					if(err) {
						console.log(err);
						res.json({
							type: 2
						});
						return;
					}
					if(!bs) {
						console.log("出错，重复接单");
						res.json({
							type: 1
						});
						return;
					}

					//设置bi
					var bi = new BangyouInfoIng({
						'_id': req.body._id
					});
					bi.set('putUserPhone', bs.putUserPhone);
					bi.set('putUserName', bs.putUserName);
					bi.set('putUserheaderImgUrl', bs.putUserheaderImgUrl);
					//设置发布时间
					bi.set('putTime', bs.putTime);
					//设置订单信息
					bi.set('code', bs.code);
					bi.set('location', bs.location);
					bi.set('time', bs.time);
					bi.set('jifen', bs.jifen);
					bi.set('isOfficial', bs.isOfficial);
					bi.set('remarks', bs.remarks);
					bi.set('address', bs.address);
					bi.set('addressId', bs.addressId);

					bi.set('getTime', (new Date()).getTime().toString());
					bi.set('getUserName', req.body.userName);
					bi.set('getUserPhone', phone);
					bi.set('getUserHeadImgUrl', req.body.userHeadImgUrl);

					bi.save(function(err, bI) {
						if(err) {
							console.log(err);
							res.json({
								type: 2
							});
							return;
						}
						console.log(bI.getUserName + "接单成功");
						res.json({
							type: 0
						});
						//接单成功，向puter发送信息
						socket.add(bs.putUserPhone, {
							'event': 'service',
							'type': 'bangyou',
							'data': {
								'type': 'getOrder',
								'id': bI._id,
								'getTime': bI.getTime,
								'getUserName': bI.getUserName,
								'getUserPhone': bI.getUserPhone,
								'getUserHeadImgUrl': bI.getUserHeadImgUrl
							}
						})

						//接单成功，删除bs
						bs.remove(function(err, bs) {
							if(err) {
								console.log(err);
								return
							}
							console.log("从BS表中删除");
							console.log(bs);
						})
					})
				})
		} else {
			res.json({
				type: 2
			})
		}
	},
	del(req, res) {
		let phone = Tokens.getPhone(req.body.token);
		if(phone) {
			BangyouInfoStart.find({
					'phone': phone,
					'_id': req.body._id
				})
				.exec(function(err, bs) {
					if(err) {
						res.json({
							type: 2
						})
						return;
					}
					if(!bs) {
						res.json({
							type: 1
						})
						return;
					}
					console.log("即将删除")
					console.log(bs);
					bs.remove(function(err) {
						if(err) {
							console.log(err);
							res.json({
								type: 2
							})
							return
						}
						console.log("删除成功");
						res.json({
							type: 0
						});
						return;
					})
				})
		} else {
			res.json({
				type: 2,
				msg: 'token无效'
			});
			return;
		}
	},
	getBS(req, res) {
		let phone = Tokens.getPhone(req.body.token);
		if(phone) {
			BangyouInfoStart.find({
					'putUserPhone': phone
				}).limit(10).lt('putTime', req.body.time)
				.exec(function(err, doc) {
					if(err) {
						console.log(err);
						res.json({
							type: 2
						});
						return;
					}
					if(!doc) {
						res.json({
							type: 1
						});
						console.log("未发现发布订单信息");
						return;
					}
					res.json({
						type: 0,
						list: doc
					});
					console.log("发现发布订单消息");
					console.log(doc);
					return;
				})
		} else {
			res.json({
				type: 2,
				msg: 'token无效'
			});
			return;
		}
	},
	getBI(req, res) {
		let phone = Tokens.getPhone(req.body.token);
		if(phone) {
			BangyouInfoIng.find({
					'putUserPhone': phone
				}).limit(10).lt('putTime', req.body.time)
				.exec(function(err, doc) {
					if(err) {
						console.log(err);
						res.json({
							type: 2
						});
						return;
					}
					if(!doc) {
						res.json({
							type: 1
						});
						console.log("未发现正在进行的订单信息");
						return;
					}
					res.json({
						type: 0,
						list: doc
					});
					console.log("发现正在进行的订单消息");
					console.log(doc);
					return;
				})
		} else {
			res.json({
				type: 2,
				msg: 'token无效'
			});
			return;
		}
	},
	getBE(req, res) {
		let phone = Tokens.getPhone(req.body.token);
		if(phone) {
			BangyouInfoEnd.find({
					'putUserPhone': phone
				}).limit(10).lt('putTime', req.body.time)
				.exec(function(err, doc) {
					if(err) {
						console.log(err);
						res.json({
							type: 2
						});
						return;
					}
					if(!doc) {
						res.json({
							type: 1
						});
						console.log("未发现已完成的订单信息");
						return;
					}
					res.json({
						type: 0,
						list: doc
					});
					console.log("发现已完成的订单消息");
					console.log(doc);
					return;
				})
		} else {
			res.json({
				type: 2,
				msg: 'token无效'
			});
			return;
		}
	},
	endGeter(req, res) {
		let phone = Tokens.getPhone(req.body.token);
		if(phone) {
			BangyouInfoIng.findOne({
					'_id': req.body._id,
					'getUserPhone': phone
				})
				.exec(function(err, bi) {
					if(err) {
						console.log(err);
						res.json({
							type: 2
						});
						return;
					}
					if(!bi) {
						console.log("没有发现文档");
						res.json({
							type: 1
						});
						return;
					}
					console.log("发现文档");
					console.log(bi);
					bi.set('endType', true);
					bi.save(function(err, bI) {
						if(err) {
							console.log(err);
							res.json({
								type: 2
							});
							return;
						}
						console.log("确认订单");
						res.json({
							type: 0
						});
						return;
					})
				})
		} else {
			res.json({
				type: 2,
				msg: 'token无效'
			});
			return;
		}
	},
	endPuter(req, res) {
		let phone = Tokens.getPhone(req.body.token);
		if(phone) {
			BangyouInfoIng.findOne({
					'_id': req.body._id,
					'putUserPhone': phone
				})
				.exec(function(err, bi) {
					if(err) {
						console.log(err);
						res.json({
							type: 2
						});
						return;
					}
					if(!bi) {
						console.log("没有发现文档");
						res.json({
							type: 1
						});
						return;
					}
					console.log("发现文档");
					console.log(bi);

					var be = new BangyouInfoEnd({
						'_id': req.body._id
					});
					be.set('putUserPhone', bi.putUserPhone);
					be.set('putUserName', bi.putUserName);
					be.set('putUserheaderImgUrl', bi.putUserheaderImgUrl);
					//设置发布时间
					be.set('putTime', bi.putTime);
					//设置订单信息
					be.set('code', bi.code);
					be.set('location', bi.location);
					be.set('time', bi.time);
					be.set('jifen', bi.jifen);
					be.set('isOfficial', bi.isOfficial);
					be.set('remarks', bi.remarks);
					be.set('address', bi.address);
					be.set('addressId', bi.addressId);

					be.set('getTime', bi.getTime);
					be.set('getUserName', bi.userName);
					be.set('getUserPhone', bi.getUserPhone);
					be.set('getUserHeadImgUrl', bi.getUserHeadImgUrl);
					be.set('endType',bi.endType);
					be.set('endTime',(new Date()).getTime().toString());
					be.save(function(err, be) {
						if(err) {
							console.log("puter确认订单完成时出错");
							console.log(err);
							res.json({
								type: 2
							});
							return;
						}
						console.log("puter确认订单");
						//确认订单完成后，删除BI中的订单
						bi.remove(function(err) {
							if(err) {
								console.log("puter确认订单，在删除BI表中订单时出错")
								res.json({
									type: 2
								});
								return;
							}
							res.json({
								type: 0
							});
							return;
						})

					})
				})
		} else {
			res.json({
				type: 2,
				msg: 'token无效'
			});
			return;
		}
	}

}