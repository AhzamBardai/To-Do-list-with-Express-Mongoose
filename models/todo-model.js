const mongoose = require('../db/connection')

const toDoSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        complete: {type: Boolean, default: false}
    }, 
    {   timestamps: true }
)

module.exports = mongoose.model('todo', toDoSchema)