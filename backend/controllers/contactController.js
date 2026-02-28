const Contact = require("../models/Contact");
require("dotenv").config();
const { Resend } = require("resend");

// @route   POST /api/contact
// @desc    Submit a new contact form message
exports.submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Simple validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email, and message",
      });
    }

    const newContact = new Contact({
      name,
      email,
      message,
    });

    await newContact.save();

    // Send email notification using Resend
    try {
      const resendApiKey = process.env.RESEND_API_KEY;
      if (resendApiKey) {
        const resend = new Resend(resendApiKey);

        // Resend requires a verified domain. If one isn't set up yet,
        // use 'onboarding@resend.dev' but it can only send TO the email used for signup.
        await resend.emails.send({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: process.env.EMAIL_USER || "your-signup-email@gmail.com", // Send to yourself
          subject: `New Portfolio Message from ${name}`,
          text: `You have received a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`,
        });
      } else {
        console.warn(
          "RESEND_API_KEY environment variable is not set. Email not sent.",
        );
      }
    } catch (emailError) {
      console.error("Email sending failed, but contact was saved:", emailError);
    }

    res.status(201).json({
      success: true,
      message: "Message sent successfully! I will get back to you soon.",
    });
  } catch (error) {
    console.error("Contact submission error:", error);
    res.status(500).json({
      success: false,
      message: "Server error, please try again later",
    });
  }
};

// @route   GET /api/contact
// @desc    Get all contact submissions (Could be protected for admin only)
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res
      .status(200)
      .json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    console.error("Fetch contacts error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
