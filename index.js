const http = require('http');
const fs = require('fs');

const server = http.createServer();

server.on('request', handleRequest);

server.listen(8000, () => console.log('Server started at http://localhost:8000'));

async function handleRequest(request, response) {
    const {url, method} = request;
    console.log(url);
    
    if (method == 'GET') {
        fs.readFile(url.slice(1) || 'index.html', (err, data) => {
            if (!err) return response.end(data);
    
            response.statusCode = 404;
            response.end('File or path not found: ' + url);
        });
    } else if (method == 'POST') {
        const body = await getBody(request);

        addToDB(JSON.parse(body));
    }
}

function addToDB(obj) {
    fs.readFile('db.json', 'utf-8', (err, json) => {
        if (err) return console.log(err);

        const data = JSON.parse(json);

        data.push(obj);
        
        json = JSON.stringify(data, null, 4);
        
        fs.writeFile('db.json', json, err => err && console.error(err));
    });
}

async function getBody(request) {
    const chunks = [];
    
    for await (const chunk of request) chunks.push(chunk);

    return Buffer.concat(chunks).toString();
}
