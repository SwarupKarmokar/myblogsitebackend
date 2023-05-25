const mongoose = require('mongoose')
require('dotenv').config()
mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGO_URL)
    .then(console.log("connected successfully"))
    .catch(err => console.log(err));