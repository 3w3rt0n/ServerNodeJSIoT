var http = require('http');
var fs = require('fs');
var mongoose = require('mongoose');

var uristring = 'mongodb://dbuser:dbpassword@ds155028.mlab.com:55028/banco1';

mongoose.connect(uristring, function (err, res) {
      if (err) {
      	console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
      	console.log ('Succeeded connected to: ' + uristring);
      }
});
 
// Cria um novo Schema com os campos que iremos utilizar no model Contato
var bancoSchema = new mongoose.Schema({
  nome: String,
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  id: String,
  dispositivos: Number
});
 
//Define o model do banco
var banco = mongoose.model('banco', bancoSchema);

// Criar o servidor
var server = http.createServer(function(request, response){
	
	response.writeHead(200, {"Content-Type": "text/html"});
	
	if(request.url == "/"){
		response.write("<h1>Página principal</h1>");
		console.log('Pagina inicial');
		response.end();
	}else if(request.url == "/bemvindo"){
		response.write("<h1>Bem-vindo :)</h1>");
		console.log('Pagina bem vindo');
		response.end();
	}else if(request.url == "/dispositivos"){
		console.log('Arquivo dispositivos - inicio.');
		fs.readFile(__dirname + '/HTML/dispositivos.html', function(err, html){
			response.write(html);
			console.log(html);
			response.end();
		});
		console.log('Arquivo dispositivos - fim.');
	}else {
		response.write("<h1>Página não encontrada :(</h1>");
		console.log('Pagina nao encontrada');
		response.end();
	}
	
});

server.listen(process.env.PORT, function(){
	console.log('Servidor rodando!');
});
