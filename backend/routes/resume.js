const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const Profile = require("../models/Profile");
require("dotenv").config();

// We'll use memory storage for Multer, then pipe straight into GridFSBucket
const storage = multer.memoryStorage();
const upload = multer({ storage });

let gfsBucket;
mongoose.connection.once("open", () => {
  // Use the native MongoDB GridFSBucket from Mongoose's underlying driver
  gfsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "resumes",
  });
});

// @route POST /api/resume/upload
// @desc  Uploads file to DB
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    if (!gfsBucket) {
      return res
        .status(500)
        .json({ success: false, message: "Database connection not ready" });
    }

    const filename = `resume_${Date.now()}_${req.file.originalname}`;

    // Create an upload stream to GridFS
    const uploadStream = gfsBucket.openUploadStream(filename, {
      contentType: req.file.mimetype,
    });

    // Write the buffer from memory into the stream
    uploadStream.end(req.file.buffer);

    uploadStream.on("finish", async () => {
      // After successful upload, update Profile
      const downloadUrl = `/api/resume/download/${filename}`;
      await Profile.findOneAndUpdate(
        {},
        { resumeUrl: downloadUrl },
        { new: true },
      );

      return res.status(201).json({
        success: true,
        filename: filename,
        downloadUrl: downloadUrl,
        message: "Resume uploaded successfully to MongoDB!",
      });
    });

    uploadStream.on("error", (err) => {
      throw err;
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: err.message });
  }
});

// @route GET /api/resume/download/:filename
// @desc  Display/Download the file
router.get("/download/:filename", async (req, res) => {
  try {
    if (!gfsBucket) {
      return res
        .status(500)
        .json({ success: false, message: "Database connection not ready" });
    }

    // Find the file in the resumes.files collection directly using MongoDB driver
    const files = await gfsBucket
      .find({ filename: req.params.filename })
      .toArray();

    if (!files || files.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No resume file found in database",
      });
    }

    const file = files[0];

    if (file.contentType === "application/pdf") {
      res.set("Content-Type", file.contentType);
      // inline allows viewing in browser, attachment forces download
      res.set(
        "Content-Disposition",
        `attachment; filename="Adarsh-R-Babu-Resume.pdf"`,
      );

      // Open a download stream and pipe it to the response
      const downloadStream = gfsBucket.openDownloadStreamByName(file.filename);
      downloadStream.pipe(res);
    } else {
      res.status(400).json({
        success: false,
        message: "Not a PDF file",
      });
    }
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: err.message });
  }
});

module.exports = router;
