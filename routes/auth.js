const { signUp, signin, logout, userProfile } = require("../controllers/auth");
const isAuthenticated = require("../middlewares/auth");

const router = require("express").Router();

router.route("/signup").post(signUp);
router.route("/signin").post(signin);
router.route("/logout").post(logout);
router.route("/me").get(isAuthenticated, userProfile);

module.exports = router