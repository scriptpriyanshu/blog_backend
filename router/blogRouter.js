const express = require("express");
const blogControllers = require("../controllers/blogControllers");
const verifyToken = require("../middlewares/authentication");
const router = express.Router();

router.route("/createblog").post(verifyToken ,blogControllers.CreateBlog);
router.route("/getblog").get(blogControllers.GetBlog);
router.route("/blog/:blogId").get(verifyToken ,blogControllers.GetSingleBlog);
router.route("/delete/:id").delete(verifyToken ,blogControllers.DeleteBlog);

module.exports = router;
