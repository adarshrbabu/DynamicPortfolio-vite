const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Project title is required"],
  },
  description: {
    type: String,
    required: [true, "Project description is required"],
  },
  tech: [
    {
      type: String,
    },
  ],
  image: {
    type: String,
    required: [true, "Preview image URL is required"],
  },
  githubLink: {
    type: String,
  },
  liveLink: {
    type: String,
  },
  order: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Project", projectSchema);
