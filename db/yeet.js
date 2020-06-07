const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');

const app = express()

app.use(cors());
app.use(express.json());

const port = 3000

mongoose.connect('mongodb+srv://admin:admin@qa-ylwyx.azure.mongodb.net/qadb?retryWrites=true&w=majority',
 {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("hello");
  });

const usersRouter = require('./routes/user');

app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})
