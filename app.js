var express = require("express");
var app = express();
var router = require("./controller");
var ejs = require("ejs");
app.set("view engine","ejs");
//直接获取静态资源文件下的内容
app.use(express.static("./public"));
app.use(express.static("./uploads"));
app.get("/favicon.ico",function(req,res){
   return;
});
app.get("/",router.showIndex);
app.get("/:wenjjName",router.showPhotos);
//版本2的内容
app.get("/up",router.up);
app.post("/up",router.doUp);
//添加处理404路由
app.use(function(req,res){
   res.render("err");
});
app.listen(3000);
