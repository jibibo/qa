let UserModel = require('./models/userModel.js');
let QuestionModel = require('./models/questionModel')

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

module.exports = {
    usernameExists
}
