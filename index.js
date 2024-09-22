const http = require('http')
const port = process.env.PORT || 5000
const fs = require('fs')
const express = require('express')

function serveStaticFile(res, path, contentType, responseCode = 200) {
    fs.readFile('.'+path, (err, data) => {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/plain'})
            return res.end('500 - Internal Error')
        }
        res.writeHead(responseCode, {'Content-Type': contentType})
        res.end(data)
    })
}
const server = http.createServer((req, res) => {
    const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()
    switch (path) {
        case '':
            serveStaticFile(res, '/public/home.html', 'text/html', 200)
            break
        case '/about':
            serveStaticFile(res, '/public/about.html', 'text/html', 200)
            break
        case '/img/logo.jpg':
            serveStaticFile(res, '/public/img/logo.jpg', 'image/jpg', 200)
            break
        default:
            serveStaticFile(res, '/public/404.html', 'text/html', 400)
            break;
    }
    
})
.listen(port, console.log(`server started on port ${port};
     press Ctrl-C to terminate`))