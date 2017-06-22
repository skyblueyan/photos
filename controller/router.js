//8.2引入file.js
var file = require("../models/file.js");
var formidable = require("formidable");
var sd = require("silly-datetime");
var path = require("path");
var fs = require("fs");
//向app.js暴露了showIndex方法
exports.showIndex = function(req,res){
    //res.send("我是首页");
    //res.render("index",{"wenjjs":["我","宠物","旅游"]});
    //res.render("index",{"wenjjs":file.getAllWenjj()});
    //未解决异步问题,使用回调函数
    file.getAllWenjj(function(allWjjName){
        res.render("index",{"wenjjs":allWjjName});
    });
};

//模拟暴露文件夹内容
exports.showPhotos = function(req,res,next){
    //res.send("文件夹内容");
    //1.获取请求的参数(文件夹名)
    //console.log(req.params.wenjjName);
    var wenjjName = req.params.wenjjName;
    //2.根据文件夹名称,查找所有内容
    file.getAllImagesByWenjjName(wenjjName,function(err,imgsArr){
        if(err){
            next();
            return;
        }
        //console.log("返回的所有图片",imgsArr);
        res.render("photos",{"images":imgsArr,"wenjjName":wenjjName});
    });
};

//版本2
exports.up = function(req,res){
    file.getAllWenjj(function(allWjjName){
        res.render("up",{"wenjjs":allWjjName});
    });
};
//处理post方式提交的请求
exports.doUp = function(req,res){
    //获取表单提交的数据
    var form = new formidable.IncomingForm();
    //设置上传放置的位置
    form.uploadDir = path.normalize(__dirname+"/../temp");
    //form中的内容：表单域  文件
    form.parse(req,function(err,fields,files){
        if(err){
            throw err;
        }
        //重命名
        //拼接图片的名称(时间+随机数)和后缀名
        var time = sd.format(new Date(),"YYYYMMDDHHmmss");
        var ran = parseInt(Math.random()*2423+2000);
        var extname = path.extname(files.tupian.name);
        //改名
        var old = files.tupian.path;
        //var old = __dirname+"/"+files.tupian.path;
        var xin = path.normalize(__dirname+"/../uploads/"+fields.wenjj+"/"+time+ran+extname);
        //var xin = __dirname+"/"+"uploads/"+time+ran+extname;
        console.log("旧地址"+old);
        console.log("新地址"+xin);
        //改名3.将旧名称改成新名称
        fs.rename(old,xin,function(err){
            if(err){
                throw Error("改名失败");
            }
            console.log("成功");
            res.end();
        });
    });
    return;
};