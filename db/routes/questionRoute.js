const router = require('express').Router()
let QuestionModel = require('../models/questionModel')
let UserModel = require('../models/userModel')

usernameExists = async (username, callback) =>  { // old: usernameExists = async username =>
    console.log(`Checking if user ${username} exists...`)
    
    UserModel.find({ username: username }) // should check sessionToken instead
    .then(foundUsers => {
        console.log(foundUsers)
        if (foundUsers[0]) {
            console.log(`Username ${username} exists`)
            callback(true)
        } else {
            console.log(`Username ${username} doesn't exist`)
            callback(false)
        }
    })

}

// Routes

router.route('/submit').post((req, res) => {
    console.log('ROUTE /question/submit...')
    
    if (usernameExists(req.body.author)) {
        console.log("Whatever")
        const newQuestion = new QuestionModel({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author
        })

        newQuestion.save()
        .then(() => {
            console.log(`ROUTE /question/submit OK: submitted ${req.body.title}`)
            res.status(200).json({response: 'success'})
        })
        .catch(e => {
            console.log(`ROUTE /user/register ERROR: ${e}`)
            res.status(400).json({response: 'error', error: e})
        })

    } else {
        let e = "User not found"
        
        console.log(`ROUTE /user/register ERROR: ${e}`)
        res.status(400).json({response: 'error', error: e})
    }

});

module.exports = router
