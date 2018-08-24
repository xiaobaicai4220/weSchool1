require('../models/jiFen_model.js');
var mongoose = require('mongoose');
var JiFen = mongoose.model('JiFen');
var Tokens = require('./token_controller.js');

module.exports = {
	create(phone) {
		//判断是否已创建
		JiFen.findOne({
				'phone': phone
			})
			.exec(function(err, jifen) {
				if(err) {
					console.log(err);
					return;
				}
				if(jifen) {
					console.log(phone + "试图重复创建一个积分账号");
					return;
				} else {
					var jifen = new JiFen({
						'phone': phone
					});
					jifen.set('jifen', '0');
					jifen.save(function(err) {
						if(err) {
							console.log(err);
							return;
						}
						console.log("创建积分账号成功");
						console.log(jifen);
					})
				}
			})
	},
	query(req, res) {
		let phone = Tokens.getPhone(req.body.token);
		if(phone) {
			JiFen.findOne({
					'phone': phone
				})
				.exec(function(err, jifen) {
					if(err) {
						console.log(err);
						res.json({
							type: 2
						});
						return;
					}
					if(jifen) {
						console.log("查询:");
						console.log(jifen);
						res.json({
							'type': 0,
							'jifen': jifen.jifen
						});
						return;
					}
					res.json({
						'type': 1
					});
					return;
				})
		} else {
			res.json({
				type: 2
			});
		}
	},
	add(phone, num) {
		JiFen.findOne({
				'phone': phone
			})
			.exec(function(err, jifen) {
				if(err) {
					console.log(err);
					return 1;
				};
				if(!jifen) {
					consle.log("试图为不存在的账号" + phone + "添加积分:" + num);
					return 2;
				}
				jifen.set('jifen', (Number.parseInt(jifen.jifen) + num).toString());
				jifen.save(function(err, jifen) {
					if(err) {
						consle.log("增加积分失败");
						return 3;
					} else {
						console.log("增加积分");
						console.log(jifen);
						return 0;
					}
				})
			})
	},
	reduce(phone, num, pass) {
		JiFen.findOne({
				'phone': phone
			})
			.exec(function(err, jifen) {
				if(err) {
					console.log(err);
					return 1;
				}
				if(!jifen) {
					consle.log("试图为不存在的积分账号" + phone + "消费积分");
					return 2;
				}
				//密码验证
				if(jifen.pass != hashPW(pass)) {
					console.log("积分账号：" + phone + " 试图使用错误的密码" + pass + "消费积分");
					return 3;
				}
				var num = Number.parseInt(jifen.jifen) - num;
				if(num < 0) {
					console.log("积分账号:" + phone + "拥有积分:" + jifen.jifen + "试图消费" + num);
					return 4;
				}
				jifen.set('jifen', num.toString());
				jifen.save(function(err, jifen) {
					if(err) {
						console.log(err);
						return 5;
					}
					console.log("减少积分");
					console.log(jifen);
					return 0;
				})
			})
	}
}