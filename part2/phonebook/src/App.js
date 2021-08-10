import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleSearchChange = (event) => setSearch(event.target.value);

  const addNewName = (event) => {
    event.preventDefault();

    const somePerson = persons.some((p) => p.name === newName);

    if (somePerson) return alert(`${newName} is already added to phonebook`);

    const nameObject = {
      name: newName,
      number: newNumber,
    };

    setPersons(persons.concat(nameObject));
    setNewName("");
    setNewNumber("");
  };

  const filteredPersons = persons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      filter show with <input onChange={handleSearchChange} value={search} />
      <form onSubmit={addNewName}>
        <h2>add a new</h2>
        <div>
          name: <input onChange={handleNameChange} value={newName} />
        </div>
        <div>
          number: <input onChange={handleNumberChange} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {filteredPersons.map((person) => (
          <p style={{ margin: "0px" }} key={person.name}>
            {person.name} {person.number}
          </p>
        ))}
      </div>
    </div>
  );
};

export default App;
