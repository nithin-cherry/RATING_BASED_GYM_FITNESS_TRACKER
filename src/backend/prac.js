const http = require('http');
const url = require ('url');
const server = http.createServer((req, res) => {

    
    const pathname = req.url; 
   
    if (pathname === '/nithin' || pathname === '/') {
        res.end("admin");
    }
    else if (pathname === '/normal') {
        res.end("normal user");
    }
    
    else if(pathname === '/api')
    {
        res.end("API");
    }
        
    else
    {
        res.writeHead(404, {
            'Content-Type': 'text/html',
            'my-own-header': 'hello world',
        });
        res.end('<h1> not found</h1>');
    }


});

server.listen(8000, '127.0.0.1', () => {
    console.log("listening to the port 8000 ......    ");
})