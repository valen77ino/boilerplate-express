let express = require('express');
let app = express();

console.log("Hello World");

app.use("/",(req,res,next)=>{
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/",(req,res)=>
  {
    res.sendFile(__dirname + "/views/index.html")
  });

app.get("/json",(req,res)=>
  {
    const mySecret = process.env['MESSAGE_STYLE']
    if (mySecret=="uppercase") {
      res.json({"message": "HELLO JSON"});
    } else {
      res.json({"message": "Hello json"});
    }
  });

app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.json({"time": req.time});
});

app.get('/:word/echo', function(req, res) {
  res.json({"echo": req.params.word});
});

app.get('/name', function(req, res) {
  res.json({"name": req.query.first + " " + req.query.last});
});





 module.exports = app;
