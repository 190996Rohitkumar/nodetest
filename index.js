const express=require('express');
const app=express();
const cookieparser=require("cookie-parser");
const bodyparser=require("body-parser");
const socket=require("socket.io");

app.set("view engine","ejs");
app.use(bodyparser.urlencoded());
app.use(express.static(__dirname+"/files"));
var server=app.listen(4500,'127.0.0.1',function(){
   console.log('the server is running on port number 4500'); 
});
const io=socket(server);
app.get('/',function(req,res){
    res.sendFile(__dirname+"/files/home.html");
});
app.get("/form",function(req,res){
    res.render('form');
});
app.post("/form",function(req,res){
    res.cookie("cookie",req.body,{expire:3600+Date.now()});
    res.render("formdata",{subdata:req.body});
//    console.log(Date.now());
    
});
app.get("/chat",function(req,res){
    
    res.render("chat");
    io.on('connection',function(socket){
       socket.emit('showstatus');
        
        socket.on('disconnect',function(){
            console.log("someone is disconnected");
        });
    });
});
