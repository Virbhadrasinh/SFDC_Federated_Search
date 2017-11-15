var http = require('http');
//var https = require('https');
var fs = require('fs');
var base64url = require('base64url');
var crypto = require('crypto');

//var options = {
//  key: fs.readFileSync('privateKey.key'),
//  cert: fs.readFileSync('certificate.crt')
//};

http.createServer(function (req, res) {
//https.createServer(options, function (req, res) {
	console.log("req.url--->",req.url);
	console.log("req.headers--->",req.headers);
	console.log("req.body--->",req.body);
	console.log("req.cookies--->",req.cookies);
	console.log("req.params--->",req.params);
	console.log("req.query--->",req.query);
	console.log("req.method--->",req.method);
	
	
	
	if(req.url.lastIndexOf("/search.iv") >=0){
		res.writeHead(200, {"Content-Type" : "application/xml"});
		res.end(fs.readFileSync(__dirname + "/results.xml"));
	} else if(req.url.lastIndexOf("/search.in") >=0){
		res.writeHead(200, {"Content-Type" : "application/xml"});
		res.end(fs.readFileSync(__dirname + "/example_atom.xml"));
	} else if(req.url.lastIndexOf("/standalone.iv") >=0) {
		var body = "",decodedSignedRequest;
		req.on('data', function (chunk) {
			body += chunk;
		    console.log("req.data--->",body);
		    console.log("chunk--->",chunk.toString());
		    var signed_request = body.substring(body.lastIndexOf("signed_request=")+15,body.length);
		    console.log("signed_request--->",signed_request);
		    function decode(signed_request, secret) {
		        if(!signed_request || !secret) {
		            return new Error('Must pass both signed_request and api secret');
		        }
		        try {
		            encoded_data = signed_request.split('.', 2);
		            var first = decodeURIComponent(encoded_data[0]), second = decodeURIComponent(encoded_data[1]);
		            encoded_data = [first, second];
		            console.log("encoded_data------->",encoded_data);
		            sig = encoded_data[0];
		            console.log("sig=encoded_data[0]------->",sig);
		            json = base64url.decode(encoded_data[1]);
		            console.log("json=encoded_data[1] after base64url.decode------->",json);
		            data = JSON.parse(json);
		            console.log("data after JSON.parse------->",data);
		        } catch (e) {
		        	console.log(e);
		            return new Error('Could not parse signed-request');
		        }
		        // check algorithm - not relevant to error
		        if (!data.algorithm || data.algorithm.toUpperCase() != 'HMACSHA256') {
		            return new Error('Unknown algorithm. Expected HMACSHA256');
		        }
		        expected_sig = crypto.createHmac('sha256', secret).update(encoded_data[1]).digest('base64');
		        if (sig !== expected_sig) {
		            return new Error('Bad signed JSON Signature!');
		        }
		        return data;
		    }
		    decodedSignedRequest = decode(signed_request, '1190220089075654466');
		    console.log("<---------------------------------------------------------------------->");
		    console.log("Final Result------->",decodedSignedRequest);
		    console.log("<---------------------------------------------------------------------->");
		    res.writeHead(200);
			res.end(JSON.stringify(decodedSignedRequest));
		  });
	} else {
		res.writeHead(200);
		res.end("hello world\n");
	}
}).listen(process.env.PORT || 8000);