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

    // Convert the download stream to a base64 string
    const downloadStream = gfsBucket.openDownloadStreamByName(file.filename);

    const chunks = [];

    downloadStream.on("data", (chunk) => {
      chunks.push(chunk);
    });

    downloadStream.on("end", () => {
      const buffer = Buffer.concat(chunks);
      const base64Data = buffer.toString("base64");

      const extensionMatch = file.filename.match(/\.([0-9a-z]+)(?:[\?#]|$)/i);
      const extension = extensionMatch
        ? extensionMatch[1].toLowerCase()
        : "pdf";
      const contentType =
        file.contentType ||
        (extension === "pdf" ? "application/pdf" : "application/octet-stream");

      res.status(200).json({
        success: true,
        filename: file.filename,
        contentType: contentType,
        base64Data: `data:${contentType};base64,${base64Data}`,
      });
    });

    downloadStream.on("error", (err) => {
      res
        .status(500)
        .json({
          success: false,
          message: "Error reading file stream",
          error: err.message,
        });
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: err.message });
  }
});
