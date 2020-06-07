const router = require('express').Router();
let QuestionModel = require('../models/questionModel')
let UserModel = require('../models/userModel')

userExists = async user => {

    UserModel.find({ username: user })
        .then(users => {
            if (users) {
                return true
            } 
        })
}

router.route('/add').post((req, res) => {
    userFound = userExists(req.body.author)

    if (userFound) {
        const newQuestion = new QuestionModel({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author
        })

        newQuestion.save()
        .then(() => res.json(`Submitted ${req.body.title}`))
        .catch(err => res.status(400).json('Error: ' + err))

    } else {
        res.status(400).json("User not found");
    }

});

module.exports = router;
