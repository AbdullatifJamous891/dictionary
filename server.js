var express = require('express');
var app = express();
var Dictionary = require("oxford-dictionary-api");

var app_id = "db81d3b5"; 
var app_key = "761c0da04a192ece39097142615cbf79";
var dict = new Dictionary(app_id,app_key);


app.get('/',function (req, res){
  res.sendFile('index.html', { root : __dirname});
});

app.post('/search',function (req, res){
  var searchInput=""; var searchInputVal="";
   req.on('data', function (data) {
      searchInput += data;
      searchInput = searchInput.split("=");
      searchInputVal = searchInput[1];
     
     dict.find(searchInputVal,function(error,data){ if(error) return console.log(error); res.end(data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]) });
    
  });

});


var listener = app.listen(3000 , function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
