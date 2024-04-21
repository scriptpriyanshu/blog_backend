const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(405).json({ error: "All fields are required" });
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(409).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    res.status(200).json({ msg: "User Registered", newUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(405).json({ error: "All fields are required" });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "Please Register first!" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res
      .status(200)
      .json({ msg: "Successfully logged in", username: user.username, token });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const UserProfile = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findOne({ _id: id }).select({ password: 0 });

    res.status(200).json({ msg: "Profile", user });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const Authors = async (req, res) => {
  try {
    const user = await User.find();

    res.status(200).json({ msg: "Authors", user });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const SingleAuthor = async (req, res) => {
  try {
    const { authorId } = req.params;

    const author = await User.findOne({ _id: authorId });

    res.status(200).json({ msg: "Author", author });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const EditProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const { username, bio } = req.body;

    const user = await User.findByIdAndUpdate(id, { username, bio });

    res.status(200).json({ msg: "Profile Updated", user });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
    console.log(error);
  }
};

module.exports = {
  Register,
  Login,
  UserProfile,
  Authors,
  SingleAuthor,
  EditProfile,
};
