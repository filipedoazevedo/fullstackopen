const express = require("express");
const morgan = require('morgan');
const app = express();

app.use(express.json());

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })

app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens['body'](req, res),
  ].join(' ')
}));

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  const info = `<div>
                    <p>Phonebook has info for ${persons.length} people</p>
                    <p>${new Date()}</p>
                </div>`;
  res.send(info);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);

  if (person) {
    return res.json(person);
  }

  return res.status(404).end();
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

  const repeated_person = persons.find((p) => p.name === name);

  if (repeated_person) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  const id = parseInt(Math.random() * (999999999 - 0) + 0);
  const person = {
    id,
    name,
    number,
  };

  persons.push(person);

  return res.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
