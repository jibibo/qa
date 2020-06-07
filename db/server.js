const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');

const app = express()

const port = 3000

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://admin:admin@qa-ylwyx.azure.mongodb.net/qadb?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('hello');
});

app.use('/users', require('./routes/userRoute'));

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})
