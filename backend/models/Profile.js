const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  heroSubtitle: { type: String, required: true },
  heroParagraph: { type: String, required: true },
  aboutParagraphs: [{ type: String }],
  yearsExperience: { type: Number, required: true },
  availableForWork: { type: Boolean, default: true },
  profileImage: { type: String },
  resumeUrl: { type: String },
  links: [
    {
      name: { type: String },
      url: { type: String },
    },
  ],
  techStack: [
    {
      category: { type: String },
      iconName: { type: String }, // e.g. "Layout", "Database"
      skills: { type: String }, // e.g. "React, Vue, Tailwind CSS"
    },
  ],
});

module.exports = mongoose.model("Profile", profileSchema);
