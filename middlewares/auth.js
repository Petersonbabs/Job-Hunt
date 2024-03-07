const Users = require("../model/user");
const jwt = require("jsonwebtoken");


const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies
    if (!token) {
        
        res.send("you must be logged in to access this route.")
        return
    }

    // // verify token
    try {

        const decoded = jwt.verify(token, process.env.jwtSecret);
        const user = await Users.findById(decoded.id)
        if (!user) {
            res.status(404).json({
                status: "fail",
                message: "Can't find user with the specified token"
            })
            next()
        }

        req.user = user;
        next()

    } catch (error) {
        console.log(error)
    }

}

module.exports = isAuthenticated;
