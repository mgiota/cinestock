const http = require('http'),
    fs = require('fs'),
    url = require('url');

http.createServer((request, response) => {
    var addr = request.url,
        q = url.parse(addr, true),
        filePath = '',
        timeStamp = Date();

    if (q.pathname.includes('documentation')) {
        filePath = (__dirname + '/documentation.html');
    } else {
        filePath = 'index.html';
    }

    fs.appendFile('log.txt', 'URL: ' + addr + '\nTime: ' + timeStamp + '\n\n', function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('URL and timestamp added to log.');
        }
    });

    //return requested file back to the user
    fs.readFile(filePath, function (err, data) {
        if (err) {
            throw err;
        }

        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        response.write(data);
        response.end();

    });
}).listen(8080);