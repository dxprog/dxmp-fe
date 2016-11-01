const fs = require('fs');
const http = require('http');
const path = require('path');
const request = require('request');

const PORT = 4300;

function handleRequest(req, res) {
  let { url } = req;
  if (url.indexOf('/api') > -1) {
    console.log(`[proxy] ${url}`);
    request(`http://localhost:5000${url}`, (err, reqRes, body) => {
      res.writeHead(reqRes.statusCode);
      res.write(body);
      res.end();
    });
  } else {
    console.log(`[static] ${url}`);
    url = url === '/' ? '/index.html' : url;
    fs.readFile(path.resolve(`./${url}`), (err, data) => {
      if (!err) {
        res.write(data);
      } else {
        res.writeHead(404);
      }
      res.end();
    })
  }
}

const server = http.createServer(handleRequest);

server.listen(PORT, (err) => {
  if (!err) {
    console.log(`Listening on port ${PORT}`);
  }
});