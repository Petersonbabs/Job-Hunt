const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required."],
        trim: true,
        maxLength: 70
    },

    description: {
        type: String,
        required: [true, "description is required."],
        trim: true,
    },

    salary: {
        type: String,
        required: [true, "Salary is required."],
        trim: true,
    },

    location: {
        type: String,
    },

    available: {
        type: Boolean,
        default: true
    },

    jobType: {
        type: ObjectId,
        ref: "JobTypes"
    },

    user: {
        type: ObjectId,
        ref: "Users",
        required: true
         
    }


}, { timestamps: true })



module.exports = mongoose.model("Jobs", jobSchema);