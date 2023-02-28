const http = require('http');
const fs = require('fs');

const server = http.createServer();

server.on('request', handleRequest);

server.listen(8000, () => console.log('Server started at http://localhost:8000'));

function handleRequest(request, response) {
    console.log(request.url);

    recognizeMIMEType(request.url);

    function recognizeMIMEType(url) {
        if (url == '/favicon.ico') {
            response.end('Not found');
        } else {
            fs.readFile(`./${url}`, (err, data) => {
                if (err) return console.log(err);
    
                response.end(data);
            });
        }
    }


    // if (request.url == '/index.html') {
    //     fs.readFile('./index.html', (err, html) => {
    //         if (err) return console.log(err);

    //         response.end(html);
    //     });
    // } else if (request.url == '/style.css') {
    //     fs.readFile('./style.css', (err, css) => {
    //         if (err) return console.log(err);

    //         response.end(css);
    //     });
    // } else if (request.url == '/script.js') {
    //     fs.readFile('./script.js', (err, js) => {
    //         if (err) return console.log(err);
    //         response.setHeader('Content-type', 'application/javascript');

    //         response.end(js);
    //     });
    // } else {
    //     response.end('Not found');
    // }
}