const express = require('express')
const mongoose = require('mongoose');

const router = express.Router();

const app = express()
const port = 3000
const Schema = mongoose.Schema;

// {
//     users: [
//         bob, id 1
//     ]
//     questions: [
//         {
//             title why pp big
//             author id  = 1 (bob)
//             answers: [
//                 {
//                     sdfguisdgioj,
//                     author: openbob
//                 }
//             ]
//         }
//     ]
// }

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

const questionModel = new Schema({
    title: {
        type: String,
        required: true
    },
    authorId: {
        type: Number
    },
    answers: {
        type: answerModel
    }
})

const answerModel = new Schema({
    content: {
        type: String,
        required: true
    },
    authorId: {
        type: Number,
        required: true
    }
})

const User = mongoose.model('User', userModel)

db = mongoose.connection;

mongoose.connect('mongodb+srv://admin:admin@qa-ylwyx.azure.mongodb.net/qadb?retryWrites=true&w=majority',
 {useNewUrlParser: true, useUnifiedTopology: true });

router.post("test", (req, resp) => {
    const username = req.body.username
    const password = req.body.password

    const insert = new User({
        username,
        password
    })

    insert.save().then(() => res.json(`Registered user ${username}`))
    .catch(err => res.status(400).json('Error: ' + err))
})

app.use("/register", router)

db.once('open', function() {
    console.log("hello");
  });

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))