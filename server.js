var http = require('http'), 
	fs = require('fs'),
	decode = require('signed-request');

http.createServer(function (req, res) {
	console.log("req.url--->",req.url);
	console.log("req.headers--->",req.headers);
	console.log("req.body--->",req.body);
	console.log("req.cookies--->",req.cookies);
	console.log("req.params--->",req.params);
	console.log("req.query--->",req.query);
	
	if(req.url.lastIndexOf("/search.iv") >=0){
		res.writeHead(200, {"Content-Type" : "application/xml"});
		res.end(fs.readFileSync(__dirname + "/results.xml"));
	} else if(req.url.lastIndexOf("/search.in") >=0){
		res.writeHead(200, {"Content-Type" : "application/xml"});
		res.end(fs.readFileSync(__dirname + "/example_atom.xml"));
	} else if(req.url.lastIndexOf("/standalone.iv") >=0) {
		//res.writeHead(200, {"Content-Type" : "application/xml"});
		//res.end(fs.readFileSync(__dirname + "/example_atom.xml"));
		
		
		 
		 
		 var json = decode('YOUR_SIGNED_REQUEST', '1190220089075654466');
		
	} else {
		res.writeHead(200);
		res.end("hello world\n");
	}
}).listen(process.env.PORT || 5000);