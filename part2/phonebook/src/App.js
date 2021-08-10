import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNameChange = (event) => setNewName(event.target.value);

  const addNewName = (event) => {
    event.preventDefault();

    const somePerson = persons.some(p => p.name === newName);

    if(somePerson) return alert(`${newName} is already added to phonebook`)

    const nameObject = {
      name: newName,
    };

    setPersons(persons.concat(nameObject));
    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <div>
          name: <input onChange={handleNameChange} value={newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => (
          <p style={{ margin: "0px" }} key={person.name}>
            {person.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default App;
