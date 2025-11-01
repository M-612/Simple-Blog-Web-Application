// ✅ blog routes
const express = require("express");
const router = express.Router();
const Blog = require("./models/Blog");

// CREATE blog
router.post("/api/blogs", async (req, res) => {
    try {
        const newBlog = new Blog(req.body);
        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// READ all blogs
router.get("/api/blogs", async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
