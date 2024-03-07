const Users = require("../model/user");

// Get all users
const getUsers = async (req, res, next) => {

    // enable pagination
    const pageSize = 10
    const page = Number(req.param.pageNumber) || 1
    const count = await Users.find({}).estimatedDocumentCount();


    

    try {
        const users = await Users.find().sort({ createdAt: -1 }).select("-password")
            .skip(pageSize * (page - 1)) // specify how many documents to skip 
            .limit(pageSize) // number of document at a time
        if (!users) {
            res.status(404).json({
                status: "error",
                message: "Couldn't fetch users.",

            })
        }

        res.status(200).json({
            status: "success",
            message: "Users fetched successfully!",
            pages: Math.ceil(count / page),
            count,
            users
        })


        next()
    } catch (error) {
        console.log("Error occured while fetching users..", error);
        res.send("Error occured while fetching users..", error);
    }

}


// single User
const getSingleUser = async (req, res, next) => {
    const userId = req.params.id

    try {
        const user = await Users.findById(userId).select("-password");
        if (!user) {
            res.status(404).json({
                status: "fail",
                message: "There's no user with this id"
            })
        }

        res.status(200).json({
            status: "success",
            user
        })

        return

    } catch (error) {
        next(error, 500)
    }
}


// Edit Users
const editUser = async (req, res, next) => {
    const userId = req.params.id

    try {
        const user = await Users.findByIdAndUpdate(userId, req.body, { new: true });
        if (!user) {
            res.status(404).json({
                status: "fail",
                message: "There's no user with this id"
            })
        }

        res.status(200).json({
            status: "success",
            user
        })

        return

    } catch (error) {
        next(error, 500)
    }
}


// Delete Users
const deleteUser = async (req, res, next) => {
    const userId = req.params.id

    try {
        const user = await Users.findByIdAndDelete(userId);
        if (!user) {
            res.status(404).json({
                status: "fail",
                message: "There's no user with this id"
            })
        }

        res.status(200).json({
            status: "success",
        })

        return

    } catch (error) {
        next(error, 500)
    }
}

module.exports = { getUsers, getSingleUser, editUser, deleteUser }