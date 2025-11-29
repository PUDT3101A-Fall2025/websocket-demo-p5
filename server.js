import express from "express";
import expressWs from "express-ws";

// Create a server
const server = express();
// Added websocket features
expressWs(server);

server.use(express.static("site"));

let id = 0;
let positions = {};

let connections = [];

server.ws("/", (client) => {
  let myID = id++;

  console.log(`user ${myID} connected`);
  connections.push(client);

  client.on("message", (data) => {
    positions[myID] = JSON.parse(data);
    for (let client of connections) {
      client.send(JSON.stringify(Object.values(positions)));
    }
  });
});

server.listen(3000, "0.0.0.0");