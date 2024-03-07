const { createJobType, loadjobTypes } = require("../controllers/jobType");
const isAuthenticated = require("../middlewares/auth");

const router = require("express").Router();

router.route("/categories").get(isAuthenticated, loadjobTypes);
router.route("/category/create").post(isAuthenticated, createJobType);

module.exports = router