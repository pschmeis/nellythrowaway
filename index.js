const express = require("express");

// create server from express
const server = express(); // server has no listeners

// Tell server how to process different payloads
server.use(express.json());

// Use dynamic port when not running locally
const PORT = process.env.PORT || 3000;

// Create listen even for server
server.listen(PORT, () => {
  console.log("Server listening...");
});

const destinations = [];
const students = {
  dao: {
    interest: ["bananas", "cars"],
    location: "boston",
  },
  nikko: {
    interest: ["bananas", "legos"],
    location: "boston",
  },
  will: {
    interest: ["cars"],
    location: "california",
  },
};

server.get("/students", (req, res) => {
  const { name, interest, location } = req.query;

  if (name) {
    const student = students[name.toLowerCase()];

    if (student) {
      return res.send(student);
    }

    return res.send(404);
  }

  let filteredStudents = Object.values(students);

  if (interest) {
    filteredStudents = filteredStudents.filter((stu) =>
      stu.interest.includes(interest.toLowerCase())
    );
  }

  if (location) {
    filteredStudents = filteredStudents.filter(
      (stu) => stu.location.toLowerCase() === location.toLowerCase()
    );
  }

  return res.send(filteredStudents);
});

server.get("/students/name/:name", (req, res) => {
  const { name } = req.params;

  if (name) {
    const filteredStudents = Object.values(students).filter(
      (student) => student.name.toLowerCase() === name.toLocaleLowerCase()
    );
  }
  return res.send(filteredStudents);
});

server.get("/students/location/:location", (req, res) => {
  const { location } = req.params;

  if (location) {
    const filteredStudents = Object.values(students).filter(
      (student) =>
        student.location.toLowerCase() === location.toLocaleLowerCase()
    );
  }
  return res.send(filteredStudents);
});

server.get("/students/interest/:interest", (req, res) => {
  const { interest } = req.params;

  if (interest) {
    const filteredStudents = Object.values(students).filter(
      (student) =>
        student.interest.toLowerCase() === interest.toLocaleLowerCase()
    );
  }
  return res.send(filteredStudents);
});

// CRUD TIME

// CREATE => POST
server.post("/destinations", (req, res) => {
  const { destination, location, photo, description } = req.body;

  if (
    !destination ||
    !location ||
    destination.length === 0 ||
    location.length === 0
  ) {
    return res
      .status(400)
      .send({ error: "Destination and Location are both required" });
  }

  // Create a new object to put in DB
  const newDest = {
    destination,
    location,
    photo: photo && photo.length !== 0 ? photo : "http://placeholder.url",
    description: description && description.length !== 0 ? description : "",
  };

  destinations.push(newDest);

  res.redirect(303, "/destinations");
});

// Send GET request for server.
server.get("/phil", (req, res) => {
  // REPONSE to GET
  res.send("<h1>hello</h1>");
});
