const express = require('express');
require('dotenv').config();
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const port = process.env.PORT || 5000;

// DATABASE CONNECTION 
require('./config/mongoose');

// CREATING SERVER APP 
const app = express();


// STORAGE FOR IMAGES
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name)
    }
})

const upload = multer({ storage: storage })
app.post('/api/uploads', upload.single('file'), (req, res) => {
    res.json("img uploaded")
})


// MIDDLEWARE 
app.use(express.json());
app.use(cors())
app.use('/images', express.static(path.join(__dirname, "/images")))


// ROUTES FOR SERVER 
app.use('/api/auth', require('./routes/auth'))
app.use('/api/user', require('./routes/userRoutes'))
app.use('/api/post', require('./routes/postRoutes'))
app.use('/api/categories', require('./routes/categoryRoutes'))




// ADDING PORT 
app.listen(port, (err) => {
    if (err) { console.log(err); return }
    console.log(`yup server running at port: http://localhost:${port}`)
})