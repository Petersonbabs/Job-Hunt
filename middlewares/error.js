const handleDevError = require("./devErrors");
const handleProdError = require("./prodErrors");


// Middleware for all error
const handleError = (err, req, res, next) =>{

    // Dev mode error
    if (process.env.NODE_MODE == "development"){
        handleDevError(err, res)
    }

    
    // production mode
    if (process.env.NODE_MODE == "production"){
        handleProdError(err, res)
    }

    next()
} 

module.exports = handleError