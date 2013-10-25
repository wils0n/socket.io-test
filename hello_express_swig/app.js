var express = require('express'),
    app = express(),
    cons = require('consolidate');

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.get('/', function(req, res){
    res.render('hello', { name : 'Wilson' });
    //res.render('view_name', {data})
});

app.get('*', function(req, res){
    res.send('Page not found');        
 });

app.listen(3000);
console.log("ingreso");
