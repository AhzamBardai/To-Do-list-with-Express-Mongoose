const express = require('express')
const res = require('express/lib/response')
const router = express.Router()

const Todo = require('../models/todo-model')


// router.get('/', (req, res) => res.send(`Hello World`))

router.get('/', (req, res) => {
    Todo.find({})
        .then(todo => {

            var todoURL = todo.map((item, index) => {
                return {...item._doc, titleEncoded: item.title.split(' ').join('+'), index: index + 1}
            })

            todoURL.sort((a,b) => a.title > b.title ? 1 : -1)

            const todoPrime = todoURL.map((item, index) => {
                return {...item, index: index + 1}
            })

            res.render('todos/index', { todoURL : todoPrime })            
        })
        .catch(console.error)
})

router.delete('/:id', (req, res) => {

    Todo.findByIdAndRemove({ _id: req.params.id })
        .then( () => res.redirect('/todos') )
        .catch(console.error)
})



router.get('/new', (req, res) => {
    res.render('todos/new')
    
})

router.post('/', (req, res) => {

    Todo.create(req.body)
      .then(todo => {
        res.redirect('/todos');
      })
      .catch(console.error);

});

router.get('/:id/edit', (req, res) => {
    const id = req.params.id;
    Todo.findById(id)
      .then((todo) => {
        res.render('todos/edit', todo);
      })
      .catch(console.error);
  });
  
router.put('/:id', (req, res) => {
const id = req.params.id;
Todo.findOneAndUpdate(
    { _id: id }, // filter query
    {  title: req.body.title, complete: req.body.complete === 'on',  }, // update database
    { new: true }
)
    .then((todo) => {
    res.render('todos/show', todo);
    })
    .catch(console.error);

});



router.get('/:id', (req, res) => {
    Todo.findById(req.params.id)
        .then(todo => {
            res.render('todos/show', todo)
        })
        .catch(console.error)
})






module.exports = router