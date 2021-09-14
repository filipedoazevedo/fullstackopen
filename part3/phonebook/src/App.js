import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/persons";
import Notification from "./components/Notification";

import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState(null);

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleSearchChange = (event) => setSearch(event.target.value);

  const addNewName = (event) => {
    event.preventDefault();

    const repeatedPerson = persons.find((p) => p.name === newName);
    const nameObject = {
      name: newName,
      number: newNumber,
    };

    if (repeatedPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        return personsService.update(repeatedPerson.id, nameObject)
        .then(() => {
          setNotification({
              message: `The number of ${newName} was edited`,
              className: 'success',
            }
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          setPersons(persons.map(p => p.id !== repeatedPerson.id ? p : nameObject))
        }).catch(() => {
          setNotification({
              message: `Information of ${newName} has already been removed from server`,
              className: 'error',
            }
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== repeatedPerson.id))
        });
      } 
      return;
    }

    personsService.create(nameObject)
      .then((createdPerson) => {
        setPersons(persons.concat(createdPerson));
        setNewName("");
        setNewNumber("");
        setNotification({
            message: `Added ${newName}`,
            className: 'success',
          }
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }).catch(() => {
        setNotification({
            message: `There was an error adding information of ${newName}`,
            className: 'error',
          }
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      });
  };

  useEffect(() => {
    personsService.getAll().then((persons) => {
      setPersons(persons);
    }).catch(() => {
      setNotification({
          message: `There was an error getting persons`,
          className: 'error',
        }
      )
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    })
  }, []);

  const filteredPersons = persons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const deletePerson = function(person) {
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService.remove(person.id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== person.id));
      }).catch(() => {
        setNotification({
            message: `There was an error getting persons`,
            className: 'error',
          }
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      });
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter handleSearchChange={handleSearchChange} search={search} />
      <h3>Add a new</h3>
      <PersonForm
        addNewName={addNewName}
        handleNameChange={handleNameChange}
        newName={newName}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
