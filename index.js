const express = require("express");

// create server from express
const server = express(); // server has no listeners
const port = 3000;

// Create listen even for server
server.listen(port, () => {
  console.log("Server listening...");
});

// Send GET request for server.
server.get("/phil", (req, res) => {
  // REPONSE to GET
  res.send("<h1>hello</h1>");
});
