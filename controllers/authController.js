const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const User = require('../models/userSchema')


//Register user
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400).json({
            error: "All fields mandatory"
        })
    }

    const userAvailable = await User.findOne({ email })

    if (userAvailable) {
        res.status(400).json({
            message: "User already have an account"
        })
    }

    const hashPassword = await bcrypt.hash(password, 10);


    const user = await User.create({
        username, email, password: hashPassword
    })

    res.json(user)
})



//LOGIN USER
const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({
            error: "All fields are mandatory"
        });
    }

    const user = await User.findOne({ username });
    !user && res.status(400).json({ error: "No User Found" })

    const validate = await bcrypt.compare(password, user.password);
    !validate && res.status(400).json({ error: "Password Not Matched" })


    res.json(user)

})




module.exports = { registerUser, loginUser }