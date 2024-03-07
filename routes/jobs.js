const { createJob, getAllJobs, getSingleJob, updateJob, deleteJob } = require("../controllers/jobs");
const isAuthenticated = require("../middlewares/auth");

const router = require("express").Router();

router.route("/").get(isAuthenticated, getAllJobs)
router.route("/create").post(isAuthenticated, createJob)
router.route("/:id").get(isAuthenticated, getSingleJob).patch(isAuthenticated, updateJob).delete(isAuthenticated, deleteJob)

module.exports = router