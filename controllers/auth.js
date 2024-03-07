const Users = require("../model/user");
const { Error } = require("mongoose");
const bcrypt = require("bcryptjs");
const signJwt = require("../utils/jwt");

// Sign up
const signUp = async (req, res) => {


    try {
        const user = await Users.create(req.body);
        const token = signJwt(user.id, user.email)
        res.status(201).cookie("token", token, { maxAge: 60 * 60 * 1000, httpOnly: true }).json({
            success: true,
            token,
            user
        })



    } catch (error) {
        console.log("Error occured while signing up", error);
        res.json({
            success: false,
            message: "An error occured."
        })
    }

}

// sign in
const signin = async (req, res) => {
    const { email, password } = req.body
    
    if (!email || !password) {
        res.send("Kindly complete the form");
    }

    try {
        const user = await Users.findOne({ email });
        const passwordCorrect = user ? await bcrypt.compare(password, user.password) : ""
        

        if (!user || !passwordCorrect) {
            res.status(403).json({
                status: "failed",
                message: "Invalid credentials"
            })
        }

        const token = signJwt(user.id, user.email)
        res.status(200).cookie("token", token, { maxAge: 60 * 60 * 1000, httpOnly: true }).json({
            status: "success",
            message: "Login successful!",
            token,

        })
        

    } catch (error) {
        console.log(error);
    }
}


// logout
const logout = (req, res) => {
    res.clearCookie("token")
    res.status(200).json({
        status: "success",
        message: "logou successful!"
    })
}


// user profile
const userProfile = async (req, res) => {
    
    try {
        const user = await Users.findById(req.user.id).select("-password");
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.send("There's an error in", error)
    }
}


module.exports = { signUp, signin, logout, userProfile }

