import express from "express";
import expressWs from "express-ws";

// Create a server
const server = express();
// Added websocket features
expressWs(server);

server.use(express.static("site"));

let id = 0;

// List of active clients
let clients = [];

// Total list of drawn points
let points = [];

server.ws("/", (client) => {
  // Get the current ID
  let myID = id;
  id += 1;

  console.log(`user ${myID} connected`);
  clients.push(client);

  // Send the entire history to the client
  for (let point of points) {
    client.send(JSON.stringify(point));
  }

  // Every time the client draws a point, it sends a message to the server
  client.on("message", (data) => {
    points.push(JSON.parse(data));
    for (let client of clients) {
      client.send(data);
    }
  });

  // If the client closes the connection, remove it from the list of clients
  client.on("close", () => {
    console.log(`user ${myID} disconnected`)
    clients = clients.filter(c => c !== client)
  });
});

// The "0.0.0.0" will listen on any IP addresses associated with the computer
server.listen(3000, "0.0.0.0");