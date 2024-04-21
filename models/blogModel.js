const { model, Schema } = require("mongoose");

const BlogSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    metadesc: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    imageUrl: {
      type: String,
      default:
        "https://img.freepik.com/free-photo/colorful-design-with-spiral-design_188544-9588.jpg?size=626&ext=jpg&ga=GA1.1.553209589.1713484800&semt=sph",
    },
  },
  { timestamps: true }
);

const Blog = model("Blog", BlogSchema);

module.exports = Blog;
