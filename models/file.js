//模拟所有文件夹
/*exports.getAllWenjj = function(){
    return ["我","宠物","哈哈"];
};*/
var fs = require("fs");
//获取uploads文件夹下的所有文件夹
exports.getAllWenjj = function(callback){
    fs.readdir("./uploads/",function(err,data){
        if(err){
            callback("找不到文件夹"+null);
            return;
        }
        //console.log(data);
        //存放名称的数组
        var allWjjName = [];
        (function iterator(i){
            //是否遍历结束
            if(i==data.length){
                //console.log(allWjjName);
                callback(allWjjName);
                return;
            }
            //遍历每个文件夹
            fs.stat("./uploads/"+data[i],function(err,stats){
                if(stats.isDirectory()){
                    allWjjName.push(data[i]);
                }
                iterator(i+1);
            });
        })(0);
    });
};

//获取一个文件夹下的所有图片
exports.getAllImagesByWenjjName = function(wenjjName,callback){
    fs.readdir("./uploads/"+wenjjName,function(err,data){
        if(err){
            callback("找不到文件"+null);
            return;
        }
       //console.log(data);
        var imgsArr = [];//用来放所有的图片
        (function iterator(i){
            if(i==data.length){
                callback(null,imgsArr);
                return
            }
            fs.stat("./uploads/"+wenjjName+"/"+data[i],function(err,stats){
                if(err){
                    callback("找不到文件"+data[i]+null);
                    return;
                }
                if(stats.isFile()){
                    imgsArr.push(data[i]);
                }
                iterator(i+1);
            });
        })(0);
    });
};