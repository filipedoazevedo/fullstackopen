import React from "react";

const Person = ({ person }) => (
  <p style={{ margin: "0px" }}>
    {person.name} {person.number}
  </p>
);

const Persons = ({ filteredPersons }) => (
  <div>
    {filteredPersons.map((person) => (
      <Person key={person.name} person={person} />
    ))}
  </div>
);

export default Persons;
