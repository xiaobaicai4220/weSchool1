var express = require("express");
var app = express();
var upload = require('./fileupload');
app.get('/',function(req,res){
	res.send("<form id='editfile' method='post' action='/system/upload' enctype='multipart/form-data'><input name='text' type='text'/>选择图片：<input name='avatar' id='upfile' type='file'/><input type='submit' value='提交'/></form>");
})
//文件上传服务
app.post('/upload', upload.single('avatar'), function (req, res, next) {
	console.log(req.body);
	console.log(req.file);
	console.log(req.url);
	console.log(req);
    if (req.file) {
        res.json({'msg':'文件上传成功'})
        console.log(req.file);
        console.log(req.body);
    }
});