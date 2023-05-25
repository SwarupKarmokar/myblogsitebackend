const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const User = require('../models/userSchema')
const Post = require('../models/postSchema')

// UPDATE USER 
const updateUser = asyncHandler(async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const hashPassword = await bcrypt.hash(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })

        res.json(updatedUser)
    }
    else {
        res.status(401).json("you can't update")
    }
})



// DELETE USER 
const deleteUser = asyncHandler(async (req, res) => {
    if (req.body.userId === req.params.id) {
        // DELETING POST BY THE USER 
        const user = await User.findById(req.params.id)
        await Post.deleteMany({ username: user.username })

        // DELETING USER FROM DB
        await User.findByIdAndDelete(req.params.id)
        res.json({
            message: "User Deleted Successfully"
        })
    }
    else {
        res.status(401).json("you can't delete other account")
    }
})


//GET USER 
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(others)
})

module.exports = { updateUser, deleteUser, getUser }