var express = require('express');
var app = express();
app.use('/tool-script',express.static(__dirname+'/tool-script'));
app.use('/static',express.static(__dirname+'/static'));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

app.listen(8080);
