const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userModel = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    id: {
        type: Number
    },
    registered: {
        type: Date
    }
})

const User = mongoose.model('User', userModel);

module.exports = User;

