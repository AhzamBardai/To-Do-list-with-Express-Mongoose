const express = require('express')

const app = express()

// must be above routes!!
app.set('view engine', 'hbs')

// start express routes --------------------
const Todo = require('./models/todo-model')

app.get('/', (req, res) => res.send(`Hello World`))

app.get('/todos', (req, res) => {
    Todo.find({})
        .then(todo => {

            const todoURL = todo.map(item => {
                return {...item._doc, titleEncoded: item.title.split(' ').join('+')}
            })

            res.render('todos/index', { todoURL })            
        })
        .catch(console.error)
})

app.get('/todos/:id', (req, res) => {
    Todo.findById(req.params.id)
        .then(todo => {
            res.render('todos/show', todo)
        })
        .catch(console.error)
})


// end express routes ---------------------


const port = process.env.PORT || 4000

app.listen(port, () => console.log(`express on ${port}`))