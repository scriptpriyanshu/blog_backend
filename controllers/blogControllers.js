const Blog = require("../models/blogModel");
const User = require("../models/userModel");

const CreateBlog = async (req, res) => {
  try {
    const { title, content, imageUrl, metadesc } = req.body;
    const author = req.user.id;
    console.log(author);
    if (!title || !content || !metadesc) {
      res.status(400).json({ msg: "Please fill in all fields" });
      return;
    }

    const newBlog = await Blog.create({
      title,
      content,
      metadesc,
      imageUrl,
      author,
    });

    const writer = await User.findOne({ _id: author });
    const writerUsername = writer.username;

    res.status(200).json({ newBlog, writerUsername });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const GetBlog = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({ blogs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const GetSingleBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }

    const author = blog.author;

    const writer = await User.findOne({ _id: author });
    const writerUsername = writer.username;

    res.status(200).json({ blog, writerUsername, writer });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const DeleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    await Blog.findByIdAndDelete(id);
    res.status(200).json({ msg: "Blog deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { CreateBlog, GetBlog, GetSingleBlog, DeleteBlog };
