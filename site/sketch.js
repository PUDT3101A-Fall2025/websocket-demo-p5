let socket;

// This will be an array of points to be drawn
let points = [];

function setup() {
  createCanvas(400, 400);
  
  // Create a websocket. Notice that using "window.location.hostname" here means that
  // we don't need to hard-code the IP address in our client. Instead, it expects the
  // websocket to be hosted at the same IP address as the webpage
  socket = new WebSocket(`ws://${window.location.hostname}:3000/`);
  
  // Set up a message listener
  socket.addEventListener("message", (event) => {
    let data = JSON.parse(event.data);
    points.push(data);
  });
}

function draw() {
  background(220);
  
  // The draw loop draws all of the points
  for (let [x, y] of points) {
    rect(x, y, 10, 10);
  }
}

function mouseDragged() {
  let point = [mouseX, mouseY];
  
  // Whenever the user drags on the canvas, send their current mouse point
  // to the server
  socket.send(JSON.stringify(point));
}