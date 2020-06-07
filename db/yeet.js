const express = require('express')
const mongoose = require('mongoose');

const app = express()
const port = 3000


db = mongoose.connection;

mongoose.connect('mongodb+srv://admin:admin@qa-ylwyx.azure.mongodb.net/qadb?retryWrites=true&w=majority',
 {useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => res.send('Hello World!'))

db.once('open', function() {
    console.log("hello");
  });

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))