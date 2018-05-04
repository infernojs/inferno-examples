const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');

const port = 8080; // Prefer port > 1024 to avoid super-user permission

const server = http.createServer((request, response) => {
	const mimeType = {
		'.html': 'text/html',
		'.js': 'text/javascript',
		'.gz': 'application/javascript',
	};
	let pathname = '.' + url.parse(request.url).pathname;
	fs.exists(pathname, function (exist) {
		if(!exist)
		{
			// If the file is not found, return 404
			response.statusCode = 404;
			response.end(`File ${pathname} not found!`);
			return;
		}
		// If is a directory, then look for index.html
		if (fs.statSync(pathname).isDirectory())
		{
			pathname += '/index.html';
		}
		// Read file from file system
		fs.readFile(pathname, function(error, data){
			if(error)
			{
				response.statusCode = 500;
				response.end(`Error getting the file: ${error}.`);
			}
			else 
			{
				// Based on the URL path, extract the file extention. e.g. .js, .doc, ...
				const extension = path.parse(pathname).ext;
				// Set Content-Type
				response.setHeader('Content-Type', mimeType[extension] || 'text/plain' );
				response.end(data);
			}
		});
	});
});

server.listen(port, (error) => {
	if (error) {
		return console.log(`Server cannot listen port ${port} :`, error);
	}
	console.log(`Server is listening on port ${port}`);
});