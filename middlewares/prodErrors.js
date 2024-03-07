// const ErrorResponse = require("./error");

// When a unique value is being repeated
const handleDuplicateValueError = (err) => {
    const dupKey = Object.keys(err.keyValue)[0];
    const dupValue = Object.values(err.keyValue)[0];

    const message = `${dupKey} with value "${dupValue}"  exist already`;
    // const error = new ErrorResponse(message, 400);
    return error
}


const handleProdError = (err, res) => {


    let error = { ...err }
    error.message = err.message

    // mongoose cast error
    if (err.name == "CastError") {
        let message = "Sorry, file not found " + err.value
        // error = new ErrorResponse(message, 404)
    }

    // mongoose duplicate error
    else if (err.code == 11000) {
        const error = handleDuplicateValueError(err)
        res.status(error.statusCode).json({ message: error.message })
    }

    else if (err.name == "ValidationError" ) {
        const message = Object.values(err.errors).map((val)=> ` ${val.message}`)
        // error = new ErrorResponse(message, 400)
    }

    else {
        res.status(error.statusCode || 500).json({
            status: "error",
            message: error.message || "Something went wrong"
        })
    }



}

module.exports = handleProdError