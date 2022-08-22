const express = require('express');
var https = require('https');
var http = require('http');
const path = require('path');
var fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const forceDomain = require('forcedomain');
var compression = require('compression');
app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', function(a, b) {
    b.sendFile(path.join(__dirname + '/public/index.html'));
});
http.createServer(app).listen(3005, function(){
    console.log("server started running on 3005");
});
