//引入http 
const http=require("http"); 
//引入express 
const express=require("express"); 
//引入multer 
const multer=require("multer"); 
//创建服务器，绑定监听端口 
var app=express(); 
var server=http.createServer(app); 
server.listen(8081); 
//建立public文件夹，将HTML文件放入其中，允许访问 
app.use(express.static("public")); 
//文件上传所需代码 
//设置文件上传路径和文件命名 
var storage = multer.diskStorage({ destination: function (req, file, cb){ //文件上传成功后会放入public下的upload文件夹 
cb(null, './public/upload') }, filename: function (req, file, cb){ //设置文件的名字为其原本的名字，也可以添加其他字符，来区别相同文件，例如file.originalname+new Date().getTime();利用时间来区分 
cb(null, file.originalname) }
 });
var upload = multer({ storage: storage }); //处理来自页面的ajax请求。single文件上传
app.post('/upload', upload.single('file'), function (req, res, next) {
	console.log(req.body);
	console.log(req.files);
	console.log(req);
	//拼接文件上传后的网络路径， 
	var url = 'http://' + req.headers.host + '/upload/' + req.file.originalname; //将其发回客户端
	res.json({ code : 1, data : url }); 
	res.end(); 
});