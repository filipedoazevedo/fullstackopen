import React from "react";

const Person = ({ person, deletePerson }) => (
  <p style={{ margin: "0px" }}>
    {person.name} {person.number} <button onClick={() => deletePerson(person)}>delete</button>
  </p>
);

const Persons = ({ filteredPersons, deletePerson }) => (
  <div>
    {filteredPersons.map((person) => (
      <Person key={person.name} person={person} deletePerson={deletePerson} />
    ))}
  </div>
);

export default Persons;
