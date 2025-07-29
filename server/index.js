const express = require('express');
const { WebSocketServer } = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === 1) {
        client.send(data);
      }
    });
  });
});

app.use(express.static('../client/dist'));

server.listen(3001, () => {
  console.log('Server started on http://localhost:3001');
});
