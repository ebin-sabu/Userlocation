
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id},process.env.SECRET, {expiresIn: '3d'})
}

// login user
const loginUser = async (req, res) => {

    const {email, password} = req.body

    try{
        const user = await User.login(email, password)

        // create a token
        const token = createToken(user._id)
        const id = user._id
        const location = user.location
        console.log(location)

        res.status(200).json({email,location,id, token})

    }catch(error){

        res.status(400).json({error: error.message})

    }
}

// signup user
const signupUser = async (req, res) => {
    const {name,location, email, password} = req.body

    try{
        const user = await User.signup(name,location, email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({name,location, email, token})

    }catch(error){

        res.status(400).json({error: error.message})

    }
}

module.exports = {loginUser, signupUser}