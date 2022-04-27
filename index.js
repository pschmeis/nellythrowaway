const express = require("express");

// create server from express
const server = express(); // server has no listeners

const PORT = porcess.env.PORT || 3000;

// Create listen even for server
server.listen(PORT, () => {
  console.log("Server listening...");
});

// Send GET request for server.
server.get("/phil", (req, res) => {
  // REPONSE to GET
  res.send("<h1>hello</h1>");
});
