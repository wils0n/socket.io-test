###COMUNICACION DESDE EL SERVIDOR AL CLIENTE

**Servidor**


	io.sockets.on('connection', function(socket){
		//socket, es la socket con la cual nos estamos comunicando
		
		socket.emit('e', {x: y});
		});

```e```: nombre del evento  
```x```: nombre de la data a enviar  
```y```: valor de la data a enviar


**Cliente**


    var socket = io.connect('http://127.0.0.1:3000');
	socket.on('e', function (data){
        //console.log(data.x)	
	});
	
```e```: nombre del evento  
```data.x```: nombre de la data recibida desde el servidor

 
###COMUNICACION DESDE EL CLIENTE AL SERVIDOR

**Cliente**

    var socket = io.connect('http://127.0.0.1:3000');
	socket.emit('e', {x: y});

```e```: nombre del evento  
```x```: nombre de la data a enviar
```y```: valor de la data a enviar


**Servidor**

    io.sockets.on('connection', function(socket){
        socket.on('e', function(data){
            //console.log(data.x)
    	});
    });
	
```e```: nombre del evento  
```data.x```: nombre de la data recibida desde el servidor

***Obs para chachimbos como yo:***  
Si haces un ```console.log(data.x)```, la ```data.x``` recibida en el cliente se nota en el console de tu navegador (google chrome) y la data recibida en el servidor se ve en la consola donde esta corriendo el servidor.