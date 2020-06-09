const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
console.log(cors)

require('dotenv').config();

const app = express();
app.use(cors())

const port = process.env.PORT

mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Connection established');
});

app.use(express.json());
app.use('/users', require('./routes/userRoute'));
app.use('/questions', require('./routes/questionRoute'));

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})
