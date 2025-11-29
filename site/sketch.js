let socket;

let points = [];

function setup() {
  createCanvas(400, 400);
  
  socket = new WebSocket("ws://149.31.229.99:3000/");
  
  // Set up a message listener
  socket.addEventListener("message", (event) => {
    let data = JSON.parse(event.data);
    console.log(data);
    points = data;
  });
}

function draw() {
  background(220);
  
  for (let [x, y] of points) {
    rect(x, y, 10, 10);
  }
}

function mouseMoved() {
  let point = [mouseX, mouseY];
  
  socket.send(JSON.stringify(point));
}