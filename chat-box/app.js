var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var mustacheExpress = require('mustache-express');


// view engine setup
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.render('chatbox');
    //res.render('view_name', {data})
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});

app.get('*', function(req, res){
    res.send('Page not found');        
 });

http.listen(3000);