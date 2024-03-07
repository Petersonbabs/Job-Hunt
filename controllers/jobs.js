const Jobs = require("../model/job");

// create job jobb
const createJob = async (req, res, next) => {

    try {
        const job = await Jobs.create({
            title: req.body.title,
            description: req.body.description,
            salary: req.body.salary,
            location: req.body.location,
            available: req.body.available,
            jobType: req.body.jobType,
            user: req.user.id
        })

        if (!job) {
            res.status(404).json({
                status: "failed",
                message: "Unable to create job."
            })
            return
        }

        res.status(201).json({
            status: "Success",
            job
        })


    } catch (error) {
        console.log(error);
        return
    }
}


// Get Single Job
const getSingleJob = async (req, res, next) => {

    try {
        const job = await Jobs.findById(req.params.id);

        if (!job) {
            res.status(404).json({
                status: "failed",
                message: "There's no job withn this Id."
            })
            return
        }

        res.status(200).json({
            status: "Success",
            job
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" })
        return
    }
}

// Update Single Job
const updateJob = async (req, res) => {

    const user = req.user
    const job = await Jobs.findById(req.params.id)

    try {

        if(!job){
            res.status(404).json({
                status: "Not Found",
                message: "This job does not exist"
            })
        }

        if(job.user.toString() !== user.id || user.role != 1 ){
            res.status(403).json({
                status: "failed",
                message: "Access denied, You can't update a job you didn't post."
            })
            return
        }

        const updatedJob = await Jobs.findByIdAndUpdate(req.params.id, req.body, {new: true}).populate("jobType", "jobTypeName").populate("user", 'firsName', "secondName")
        
        if (!updatedJob) {
            res.status(404).json({
                status: "failed",
                message: "Unable to update job details."
            })
            return
        }

        res.status(200).json({
            status: "Success",
            updatedJob,
            usera: user.id
        })

    } catch(error) {
        console.log(error);
    }
}

// Delete Single Job
const deleteJob = async (req, res) => {

    const user = req.user
    const job = await Jobs.findById(req.params.id)
    
    try {

        console.log(!user);

        if(!job){
            res.status(404).json({
                status: "failed",
                message: "This job does not exist."
            })

            return
        } else if(job.user.toString() !== user.id && user.role == 1 ){
            res.status(403).json({
                status: "failed",
                message: "Access denied, You can't delete a job you didn't post."
            })
            return
        }

        

        const jobDeleted = await Jobs.findByIdAndDelete(req.params.id)
        
        if (!jobDeleted) {
            res.status(404).json({
                status: "failed",
                message: "Unable to delete job details."
            })
            return
        }

        res.status(200).json({
            status: "Delete Successful!",
        })

    } catch(error) {
        console.log(error);
    }
}


// Get All JObs
const getAllJobs = async (req, res) => {

    // Allow pagination
    const pageSize = 10;
    const page = +req.param.pageNumber || 1

    const resultCount = await Jobs.find({}).estimatedDocumentCount()

    try {
        const jobs = await Jobs.find().sort({ createdAt: -1 })
            .skip(pageSize * (page - 1))
            .limit(pageSize)

        if (!jobs) {
            res.status(404).json({
                status: "failed",
            })
        }

        res.status(200).json({
            status: "success",
            pages: Math.ceil(resultCount / pageSize),
            jobsCount: resultCount,
            jobs
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Something went wrong" })
    }
}

module.exports = { createJob, getSingleJob, getAllJobs, updateJob, deleteJob }