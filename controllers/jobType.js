const JobTypes = require("../model/jobType");

// create job category
const createJobType = async (req, res, next) => {

    try {
        const jobType = await JobTypes.create({
            jobTypeName: req.body.jobTypeName,
            user: req.user.id
        })

        if (!jobType) {
            res.status(404).json({
                status: "failed",
                message: "Unable to create job category."
            })
            return
        }

        res.status(201).json({
            status: "Success",
            jobType
        })


    } catch (error) {
        console.log(error);
        return
    }
}


// Load all job categories
const loadjobTypes = async (req, res, next) => {

    try {
        const resultCount = await JobTypes.find({}).estimatedDocumentCount()
        const jobTypes = await JobTypes.find()

        if (!jobTypes) {
            res.status(404).json({
                status: "failed",
                message: "Unable to fetch job categories."
            })
            return
        }

        res.status(200).json({
            status: "Success",
            result: resultCount,
            jobCategories: jobTypes
        })


    } catch (error) {
        console.log(error);
        return
    }
}

module.exports = { createJobType, loadjobTypes }