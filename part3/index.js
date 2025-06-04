require('dotenv').config()
const path = require('path');
const express = require('express')
const morgan  = require('morgan')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Note = require('./models/note')


app.use(cors())


app.use(express.static('build'));


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});




// const errorHandler = (error, request, response, next) => {
//   console.error(error.message)

//   if (error.name === 'CastError' && error.kind === 'ObjectId') {
//     return response.status(400).send({ error: 'malformatted id' })
//   } else if (error.name === 'ValidationError') {
//     return response.status(400).json({ error: error.message })
//   }

//   response.status(500).json({ error: 'internal server error' })
// }

// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: 'unknown endpoint' })
// }


// //app.use(errorHandler)
// //app.use(unknownEndpoint)


const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('Person', personSchema)

// const person = new Person({
//   name: 'Jack Reacher',
//   number: 11223344,
// })

// person.save().then(result => {
//   console.log('Person saved!')
// })


app.use(express.json())
morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

const tinyWithBody = ':method :url :status :res[content-length] - :response-time ms :body'
app.use(morgan(tinyWithBody))


// let persons = [
//   { id: "1", name: "Arto Hellas", number:3423423423 },
//   { id: "2", name: "Ada Lovelace", number: 234234 },
//   { id: "3", name: "Dan Abramov", number: 23423423},
//   { id: "4", name: "Mary Poppendieck", number: 23423423 }
// ]

// persons.map((person) => {
//   const newPerson = new Person(person)
//   newPerson.save().then(res=>{
//     console.log(person.name, " saved")
//   })
// })

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

// app.get('/api/persons', (request, response) => {
  
//   response.json(persons)
// })

app.get('/api/persons', (request, response) => {
  Person.find({}).then(person => {
    response.json(person)
  })
  .catch(error=>{
    console.log(error)
    response.status(500).end()
  })
})

// app.get('/api/persons/info', (req, res) => {
//   const count = persons.length;       
//   const now   = new Date();           
//   res.send(`
//     <p>Phonebook has info for ${count} people</p>
//     <p>${now.toString()}</p>
//   `);
// });

app.get('/api/persons/info', (req, res) => {
 Person.countDocuments({})
    .then(count => {
      const now = new Date()
      res.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${now}</p>
      `);
    })
    .catch(error=>{
    console.log(error)
    response.status(500).end()
  })
});


// app.get('/api/persons/:id', (request, response) => {
//   const id = request.params.id
//   const person = persons.find((person) => person.id === id)

//   if (person) {
//     response.json(person)
//   } else {
//     response.status(404).end()
//   }
// })

app.get('/api/persons/:id' , (request, response)=>{

  const id = request.params.id
  console.log(id)
  Person.findById(id).then(person => {
    response.json(person)
  })
  .catch(error=>{
    console.log(error)
    response.status(500).end()
  })
})

const generateId = () => {
  const maxId =
    persons.length > 0 ? Math.max(...persons.map((n) => Number(n.id))) : 0
  return String(maxId + 1)
}

// app.post('/api/persons', (req, res) => {
//   const { name, number } = req.body

//   if (!name) {
//     return res.status(400).json({ error: 'name missing' })
//   }
 

//   if (persons.some(p => p.name === name)) {
//     return res.status(400).json({ error: 'name must be unique' })
//   }

//   const newPerson = {
//     id:     generateId(),
//     name,
//   }
//   persons = persons.concat(newPerson)

//   res.status(201).json(newPerson)
// })

app.post('/api/persons', (req, res) => {
  const { name } = req.body

  if (!name) {
    return res.status(400).json({ error: 'content missing' })
  }
  if(name.length<3){
    return res.status(400).json({error:'Name length must be greater than 3'})
  }

  Person.findOne({ name }).then(existingPerson => {
    if (existingPerson) {
      return res.status(400).json({ error: 'name must be unique' })
    }

    const newPerson = new Person({ name }); 
    newPerson.save()
      .then(savedPerson => res.status(201).json(savedPerson))
      .catch(error => {
        console.error('Error saving person:', error)
        res.status(500).json({ error: 'internal server error' })
      });
  }).catch(error => {
    console.error('Error checking existing person:', error)
    res.status(500).json({ error: 'internal server error' })
  });
});




// app.delete('/api/persons/:id', (request, response) => {
//   const id = request.params.id
//   persons = persons.filter((person) => person.id !== id)

//   response.status(204).end()
// })

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id

  Person.findByIdAndDelete({ id: id })
    .then(() => {
      persons = persons.filter((person) => person.id !== id)
      response.status(204).end()
    })
    .catch(error=>{
    console.log(error)
    response.status(500).end()
  })
    
})


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

//for updating a single person

app.put('/api/persons/:id', (req, res, next) => {
  const { name, number } = req.body
  const id = req.params.id

  Person.findById(id)
    .then(person => {
      if (!person) {
        return res.status(404).json({ error: 'person not found' });
      }

      person.name = name
      person.number = number

      return person.save().then(updatedPerson => {
        res.json(updatedPerson)
      });
    })
    .catch(error => next(error))
});
