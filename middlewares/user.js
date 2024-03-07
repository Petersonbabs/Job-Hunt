
// admin middleware
const isAdmin = (req, res, next) =>{

    const user = req.user
    console.log(user);
    

    if(user.role == 0) {
        return res.status(403).json({status: "fail", message: "Access denied, you must be an admin"})
    }

    next()
}


module.exports = {isAdmin}