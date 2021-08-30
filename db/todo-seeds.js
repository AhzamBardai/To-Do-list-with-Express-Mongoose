// Require the model which has a connection to the database
const Todo = require('../models/todo-model');
// Require a json file which contains some dummy data
const seedData = require('./todo-seeds.json');


// Remove any preexisting data
Todo.deleteMany({})

    // Insert the dummy data and return it
    // so we can log it in the next .then
    .then(() => Todo.insertMany(seedData))

    // If the insert was successful, we'll see the
    // results in the terminal
    .then(console.log)

    // Log the error if the insert didn't work
    .catch(console.error)

    // Whether it was successful or not, we need to 
    // exit the database.
    .finally(() => process.exit()) // Close the connection to Mongo