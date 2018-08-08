/**
 *
 * @Description 系统服务
 * @Author Amor
 * @Created 2016/04/27 15:27
 * 技术只是解决问题的选择,而不是解决问题的根本...
 * 我是Amor,为发骚而生!
 *
 */
var express = require('express');
var router = express.Router();
var upload = require('./fileupload');

//文件上传服务
router.post('/upload', upload.single('avatar'), function (req, res, next) {
    if (req.file) {
        res.send('文件上传成功')
        console.log(req.file);
        console.log(req.body);
    }
});

module.exports = router;