const { getUsers, getSingleUser, editUser, deleteUser } = require("../controllers/users");
const isAuthenticated = require("../middlewares/auth");
const { isAdmin } = require("../middlewares/user");

const router = require("express").Router();

router.route("/users").get(isAuthenticated, isAdmin, getUsers);
router.route("/user/:id").get(isAuthenticated, getSingleUser).patch(isAuthenticated, editUser).delete(isAuthenticated, isAdmin, deleteUser)

module.exports = router