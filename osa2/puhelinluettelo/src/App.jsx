import { useState, useEffect } from 'react'
import numberService from './services/numbers'

const Person = ({name, number, deletePerson}) => {
  return (
    <p>{name} {number} <button onClick={deletePerson}>delete</button></p>
  )
}

const Persons = ({persons, deletePerson}) => {
  return (
    <ul>
      {persons.map(person =>
        <Person key={person.name} name={person.name} number={person.number} deletePerson={() => deletePerson(person.id)}/>
      )}
    </ul>
  )
}

const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input
              value={newName}
              onChange={handleNameChange}
              />
      </div>
      <div>
        number: <input
                value={newNumber}
                onChange={handleNumberChange}
                />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Filter = ({filter, handleFilterChange}) => {
  return (
    <div>
      filter shown with
      <input
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  )
}

const Info = ({message}) => {
  const infoStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    border: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === null) {
    return null
  }

  return (
    <div className="info" style={infoStyle}>
      {message}
    </div>
  )
}

const Error = ({message}) => {
  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    border: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === null) {
    return null
  }

  return (
    <div className="error" style={errorStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [infoMessage, setInfoMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    numberService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)){
      const personToUpdate = persons.find(person => person.name === newName)
      const name = personToUpdate.name
      const id = personToUpdate.id
      if (window.confirm(`${newName} is already added to phonebook. Would you like to replace the old number with a new one?`)) {
        const updatedPersonObject = {...personToUpdate, number: newNumber} 
        
        numberService
          .update(id, updatedPersonObject)
          .then(response => {
            setInfoMessage(`${name} updated`)
            setTimeout(() => {
              setInfoMessage(null)
            }, 5000)
            setPersons(persons.map(person => person.id !== id ? person : response.data))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setErrorMessage(`${name} has already been deleted from the server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(person => person.id !== id))
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      const nameObject = {
        name: newName,
        number: newNumber
      }

      numberService
        .create(nameObject)
        .then(response => {
          setInfoMessage(`${response.data.name} added`)
          setTimeout(() => {
            setInfoMessage(null)
          }, 5000)
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePerson = (id) => {
    const personToBeDeleted = persons.find(person => person.id === id)
    const name = personToBeDeleted.name

    if (window.confirm(`Delete ${name}?`)) {
      numberService
        .deleteNumber(id)
        .then(response => {
          setInfoMessage(`${name} deleted`)
          setTimeout(() => {
            setInfoMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter))

  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) =>{
    setFilter(event.target.value.toLowerCase());
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {infoMessage ? <Info message={infoMessage} /> : null}
      {errorMessage ? <Error message={errorMessage} /> : null}
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h3>Add a new person</h3>
      <PersonForm addPerson={addPerson}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App