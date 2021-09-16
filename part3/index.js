const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();

require("dotenv").config();

const Person = require(path.join(__dirname, "./models/person"));

app.use(express.json());

app.use(express.static(path.join(__dirname, "build")));

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens["body"](req, res),
    ].join(" ");
  })
);

let persons = [];

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    return res.json(persons);
  });
});

app.get("/info", (req, res) => {
  Person.find({}).then((persons) => {
    const info = `<div>
                    <p>Phonebook has info for ${persons.length} people</p>
                    <p>${new Date()}</p>
                </div>`;
    res.send(info);
  });
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  Person.findById(id)
    .then((person) => {
      if (person) return res.json(person);

      return res.status(404).end();
    })
    .catch(() => res.status(404).end());
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((p) => p.id !== id);

  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;

  if (!name) {
    return res.status(400).json({
      error: "name is missing",
    });
  }

  if (!number) {
    return res.status(400).json({
      error: "number is missing",
    });
  }

  const person = new Person({
    name,
    number,
  });

  person.save().then((savedPerson) => {
    return res.json(savedPerson);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
