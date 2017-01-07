const http = require('http');
const fs = require('fs');

const low = require('lowdb');
const db = low('dbteste.json');

db.defaults({ texto: [] }).value();

const resultado = db.get('texto').push({ nome: 'teste' }).value();
console.log(resultado);


//var mongoose = require('mongoose');
//var uristring = 'mongodb://usuario:senha@ds155028.mlab.com:55028/banco1';
//mongoose.connect(uristring, function (err, res) {
//      if (err) {
//      	console.log ('ERROR connecting to: ' + uristring + '. ' + err);
//      } else {
//      	console.log ('Succeeded connected to: ' + uristring);
//      }
//});
// Cria um novo Schema com os campos que iremos utilizar no model Contato
//var bancoSchema = new mongoose.Schema({
//  nome: String,
//  email: { type: String, required: true, unique: true },
//  senha: { type: String, required: true },
//  id: String,
//  dispositivos: Number
//});
//Define o model do banco
//var banco = mongoose.model('banco', bancoSchema);

var body = '';

// Criar o servidor
var server = http.createServer(function(request, response){
	
	response.writeHead(200, {"Content-Type": "text/html"});
	
	if (request.method == 'POST') {
        	body = '';
        	request.on('data', function (data) {
	            	body += data;
        	    	// Too much POST data, kill the connection!
            		// 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            		if (body.length > 1e6)
	                	request.connection.destroy();
        	});

        	request.on('end', function () {
			response.write("<h1>POST</h1>");
			console.log('POST: ');
			response.end();
            		console.log(body); // should work
            		// use post['blah'], etc.
        	});
    	}else if(request.url == "/"){
		response.write("<h1>Página principal</h1>");
		console.log('Pagina inicial');
		response.end();
	}else if(request.url == "/login"){
		fs.readFile(__dirname + '/HTML/login.html', function(err, html){
			response.write(html);
			console.log(html);
			response.end();
		});
	}else if(request.url == "/dispositivos"){
		fs.readFile(__dirname + '/HTML/dispositivos.html', function(err, html){
			response.write(html);
			console.log(html);
			response.end();
		});
	}else {
		response.write("<h1>Página não encontrada :(</h1>");
		console.log('Pagina nao encontrada');
		response.end();
	}
	
});

server.listen(process.env.PORT, function(){
	console.log('Servidor rodando!');
});
