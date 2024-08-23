import { useState, useEffect } from "react";
import personService from "./personService";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filteredContact, setFilteredContact] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const filterPhoneBook = () => {
    const checkContact = persons.find(
      (person) =>
        person.name.toLowerCase() === filterName.toLowerCase() ||
        person.number === filterName
    );

    setFilteredContact(checkContact || null);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      axios
        .delete(`http://localhost:3001/persons/${id}`)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setNotification({ message: `Deleted ${name}`, type: "error" });
          setTimeout(() => setNotification(null), 3000);
        })
        .catch((error) => {
          console.error("There was an error deleting the person:", error);
        });
    }
  };

  const handleClick = () => {
    const personExists = persons.find((person) => person.name === newName);

    if (personExists) {
      if (window.confirm(`Update ${newName}'s number to ${newNumber}?`)) {
        const updatedPerson = { ...personExists, number: newNumber };

        personService
          .update(personExists.id, updatedPerson)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== personExists.id ? person : updatedPerson
              )
            );
            setNewName("");
            setNewNumber("");
            setNotification({
              message: `Updated ${newName}'s number`,
              type: "success",
            });
            setTimeout(() => setNotification(null), 3000);
          })
          .catch((error) => {
            console.error("Error updating person:", error);
          });
      }
    } else {
      if (newName && newNumber) {
        const newPerson = { name: newName, number: newNumber };

        personService
          .create(newPerson)
          .then((addedPerson) => {
            setPersons([...persons, addedPerson]);
            setNewName("");
            setNewNumber("");
            setNotification({ message: `Added ${newName}`, type: "success" });
            setTimeout(() => setNotification(null), 3000);
          })
          .catch((error) => {
            console.error("Error adding person:", error);
          });
      } else {
        alert("Please enter both name and number");
      }
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filterName={filterName}
        setFilterName={setFilterName}
        filterPhoneBook={filterPhoneBook}
        filteredContact={filteredContact}
      />

      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleClick={handleClick}
      />

      <h3>Numbers</h3>
      <Persons persons={persons} handleDelete={handleDelete} />

      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

// CSS for notifications
const styles = `
  .notification {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px;
    border-radius: 5px;
    color: #fff;
    background-color: #4CAF50; /* Default success color */
    z-index: 1000;
  }
  .notification.error {
    background-color: #f44336; /* Error color */
  }
  .notification.success {
    background-color: #4CAF50; /* Success color */
  }
`;

const Filter = ({
  filterName,
  setFilterName,
  filterPhoneBook,
  filteredContact,
}) => {
  return (
    <div>
      <input
        value={filterName}
        onChange={(e) => setFilterName(e.target.value)}
        placeholder="Search by name or number"
      />
      <button onClick={filterPhoneBook}>Search</button>
      {filteredContact && (
        <div>
          <h4>Filtered Contact:</h4>
          <p>
            {filteredContact.name}: {filteredContact.number}
          </p>
        </div>
      )}
    </div>
  );
};

const PersonForm = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  handleClick,
}) => {
  return (
    <form>
      <div>
        Name:{" "}
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        Number:{" "}
        <input
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="button" onClick={handleClick}>
          Add
        </button>
      </div>
    </form>
  );
};

const Persons = ({ persons, handleDelete }) => {
  return (
    <ul>
      {persons.map((person) => (
        <li key={person.id}>
          {person.name}: {person.number}
          <button onClick={() => handleDelete(person.id, person.name)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default App;
