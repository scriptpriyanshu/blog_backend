const express = require("express");
const dotenv = require("dotenv");
const router = require("./router/blogRouter");
const urouter = require("./router/userRouter");
const cors = require("cors");
const connectDB = require("./lib/db");
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "https://blog-mern-ten-pi.vercel.app",
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use("/", router);
app.use("/", urouter);

app.get("/vercel", (req, res) => {
  res.send("hey vercel");
});

connectDB();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Serving at http://localhost:${PORT}`);
});
