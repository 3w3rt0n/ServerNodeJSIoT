const http = require('http');
const fs = require('fs');
var qs = require('querystring');

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

// Criar o servidor
var server = http.createServer(function(request, response){
	
	response.writeHead(200, {"Content-Type": "text/html"});
	
	if (request.url == "/login" && request.method == "POST") {
        	var body = '';
    		request.on('data', function(chunk) {
      			body += chunk.toString();
			console.log("1-Body: " + body);
    		});
    		request.on('end', function() {
			console.log("2-Body: " + body);
      			var data = qs.parse(body);
			console.log("Email: " + data.email);
			console.log("Senha: " + data);	
			response.end();
      			// now you can access `data.email` and `data.password`
   		});
    	}else if(request.url == "/"){
		response.write("<h1>Página principal</h1>");
		console.log('Pagina inicial');
		response.end();
	}else if(request.url == "/login"){
		fs.readFile(__dirname + '/HTML/login.html', function(err, html){
			response.write(html);
			console.log("Enviado login.html");
			response.end();
		});
	}else if(request.url == "/dispositivos"){
		fs.readFile(__dirname + '/HTML/dispositivos.html', function(err, html){
			response.write(html);
			console.log("Enviado dispositivos.html");
			response.end();
		});
	}else {
		response.write("<h1>Página não encontrada :(</h1>");
		console.log('Página não encontrada');
		response.end();
	}
	
});

server.listen(process.env.PORT, function(){
	console.log('Servidor rodando!');
});
