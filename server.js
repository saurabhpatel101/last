const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const connectDB = require('./config/db');
const path = require('path');
var cors = require('cors')

app.use(cors())

const PORT = process.env.PORT || 8080;
// init middleware

app.use(express.json({ extended: false }));
// Connect Database
connectDB();


//Define Routes
app.use('/api/users', require('./routes/users'));


app.listen(PORT, () => { console.log(`Server Started on port ${PORT}`) });