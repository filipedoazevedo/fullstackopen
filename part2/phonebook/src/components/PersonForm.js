import React from "react";

const PersonForm = ({
  addNewName,
  handleNameChange,
  newName,
  newNumber,
  handleNumberChange,
}) => (
  <form onSubmit={addNewName}>
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
);

export default PersonForm;
