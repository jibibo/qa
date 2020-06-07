const router = require('express').Router();
let QuestionModel = require('../models/questionModel')
let UserModel = require('../models/userModel')

router.route('/add').post((req, res) => {
    
    let user
    console.log(req.body.author)

    UserModel.find({ username: req.body.author })
        .then(users => {
            
            user = users[0]
            
            if (user) {
                const newQuestion = new QuestionModel({
                    title: req.body.title,
                    content: req.body.content,
                    author: req.body.author
                })

                newQuestion.save()
                .then(() => res.json(`Submitted ${req.body.title}`))
                .catch(err => res.status(400).json('Error: ' + err))
            } else {
                res.status(400).json("Username not found");
            }

        })
        .catch(err => res.status(400).json('Error: ' + err));


    

});

module.exports = router;
