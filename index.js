var http = require('http');

var server = http.createServer(function(request, response){
	response.writeHead(200, {"Content-Type": "text/html"});
	if(request.url == "/"){
		response.write("<h1>Página principal</h1>");
		console.log('Pagina inicial');
	}else if(request.url == "/bemvindo"){
		response.write("<h1>Bem-vindo :)</h1>");
		console.log('Pagina bem vindo');
	}else{
		response.write("<h1>Página não encontrada :(</h1>");
		console.log('Pagina nao encontrada');
	}
	response.end();
});

server.listen(process.env.PORT || 5000, function(){
	console.log('Servidor rodando!');
});
