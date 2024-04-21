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
    origin: [
      "https://blog-os3ks9ns7-priyanshus-projects-38ff2bbe.vercel.app",
      "https://blog-phi-eight-18.vercel.app",
    ],
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
