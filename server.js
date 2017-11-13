var http = require('http'), 
	fs = require('fs');

http.createServer(function (req, res) {
	console.log("req.url--->",req.url);
	console.log("req.headers--->",req.headers);
	console.log("req.body--->",req.body);
	console.log("req.cookies--->",req.cookies);
	console.log("req.params--->",req.params);
	console.log("req.query--->",req.query);
	
	if(req.url.lastIndexOf("/search.in") >=0){
		res.writeHead(200, {"Content-Type" : "application/xml"});
		res.end(fs.readFileSync(__dirname + "/example_atom.xml"));
	} else {
		res.writeHead(200);
		res.end("hello world\n");
	}
}).listen(process.env.PORT || 5000);