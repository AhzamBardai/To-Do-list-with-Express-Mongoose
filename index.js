const express = require('express')
const todoRoutes = require('./controllers/routes')
const methodOverride = require('method-override')
const app = express()

app.use(methodOverride('_method'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// must be above routes!!
app.set('view engine', 'hbs')

// start express routes --------------------
app.get('/', (req, res) => res.render('todos/welcome') )
app.use('/todos', todoRoutes)

// end express routes ---------------------


const port = process.env.PORT || 4000

app.listen(port, () => console.log(`express on ${port}`))