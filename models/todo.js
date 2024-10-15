const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ToDoSchema = new Schema(
    {
        heading:{
            type: String,
            required: [true, 'Todo must have a heading'],
        },
        subHeading: {
            type: String,
            required: false,
        },
        date:{
            type: Date,
            required: [true, 'ToDo must have a date'],
        },
        description: {
            type: String,
            required: [true, 'ToDo must have a description']
        },
        completed: {
            type: Boolean,
            default: false,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
);

ToDoSchema.methods.getFormattedBirthDate = function() {
    return this.date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

module.exports = mongoose.model('ToDo', ToDoSchema);
