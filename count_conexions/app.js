var express = require('express'),
    app = express(),
    cons = require('consolidate'),
    http = require('http');

var server = http.createServer(app); //envolver el servidor de express con el servidor de node

var count =0;

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.get('/', function(req, res){
    res.render('hello');
    //res.render('view_name', {data})
});

app.get('*', function(req, res){
    res.send('Page not found');        
 });

server.listen(3000);
console.log("ingreso");


var io = require('socket.io').listen(server);


io.sockets.on('connection', function(socket){
	//socket, es la socket con la cual nos estamos comunicando
	socket.on('data_al_servidor', function(data){
		console.log("Recibido del cliente: "+data.mensaje);
	});

	count++;
	console.log("usuario conectado. "+count+" usuarios ahora");

	//con las 2 lineas siguientes se envia mensajes desde el servidor hacia el cliente
	socket.emit("users", {number: count});//actualiza a todos los usuarios
	socket.broadcast.emit("users", {number: count});//actualiza a todos, excepto al que envia
	//io.sockets.emit("users", {number: count});//esto seria el reemplazo a las 2 lineas anteriores, ya que envia a todas las sockets el mensaje
	socket.on('disconnect', function(){
		count--;
		console.log("Usuarios desconectado. " +count+ " usuarios ahora");
		socket.broadcast.emit('users', {number: count});
	});
});