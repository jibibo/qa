const router = require('express').Router()
let QuestionModel = require('../models/questionModel')
let UserModel = require('../models/userModel')

async function usernameExists(username) { // old: usernameExists = async username =>
    console.log(`Checking if user ${username} exists...`)

    UserModel.find({ username: user }) // should check sessionToken instead
    .then(foundUsers => {
        if (foundUsers) {
            console.log(`Username ${username} exists`)
            return true

        } else {
            console.log(`Username ${username} doesn't exist`)
            return false
        }
    })
}

// Routes

router.route('/submit').post((req, res) => {
    console.log('ROUTE /question/submit...')
    
    if (userExists(req.body.author)) {
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
