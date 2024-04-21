const express = require("express");
const userController = require("../controllers/userControllers");
const verifyToken = require("../middlewares/authentication");
const router = express.Router();

router.route("/register").post(userController.Register);
router.route("/login").post(userController.Login);
router.route("/profile").get(verifyToken, userController.UserProfile);
router.route("/authors").get(userController.Authors);
router.route("/authors/:authorId").get(userController.SingleAuthor);
router.route("/editprofile").put(verifyToken, userController.EditProfile);
module.exports = router;
