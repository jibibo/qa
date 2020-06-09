const router = require('express').Router()
let QuestionModel = require('../models/questionModel')
let { usernameExists } = require('../util')


// Routes

router.route('/').get((req, res) => {
    QuestionModel.find({  }) 
    .then(questions => {
        res.status(200).json(questions)
    })
    .catch(e => {
        res.status(400).json({result: 'error', error: e})
    })
});

router.route('/submit').post((req, res) => {
    console.log('ROUTE /question/submit...')

    let callback = (exists) => {
        if (exists) {
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
    }

    usernameExists(req.body.author, callback);

});

module.exports = router
