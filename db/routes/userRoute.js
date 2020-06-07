const router = require('express').Router();
let UserModel = require('../models/userModel.js');

router.route('/add').post((req, res) => {

    const username = req.body.username
    const password = req.body.password
    const registered = Date.now()

    const newUser = new UserModel({
        username,
        password,
        registered
    })

    newUser.save()
    .then(() => res.json(`Registered user ${username}`))
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/').get((req, res) => {
    

    UserModel.find({ _id: req.body.id })
        .then(users => {
            res.json(users[0])
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
