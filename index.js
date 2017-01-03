var http = require('http');
var fs = require('fs');

var server = http.createServer(function(request, response){
	
	response.writeHead(200, {"Content-Type": "text/html"});
	
	if(request.url == "/"){
		response.write("<h1>Página principal</h1>");
		console.log('Pagina inicial');
	}else if(request.url == "/bemvindo"){
		response.write("<h1>Bem-vindo :)</h1>");
		console.log('Pagina bem vindo');
	}else if(request.url == "/dispositivos"){
		fs.readFile(__dirname + '/HTML/dispositivos.html', function(err, html){
			response.write(html);		
		});
		console.log('Arquivo dispositivos.');
	}else {
		response.write("<h1>Página não encontrada :(</h1>");
		console.log('Pagina nao encontrada');
	}
	response.end();
});

server.listen(process.env.PORT, function(){
	console.log('Servidor rodando!');
});
