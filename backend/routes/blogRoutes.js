import express from "express";
import Blog from "../models/Blog.js";

const router = express.Router();

// CREATE blog
router.post("/blogs", async (req, res) => {
    try {
        console.log('Received blog post request:', req.body);
        if (!req.body.title || !req.body.content) {
            return res.status(400).json({ message: "Title and content are required" });
        }
        const newBlog = new Blog({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author || "Anonymous"
        });
        const savedBlog = await newBlog.save();
        console.log('Blog saved successfully:', savedBlog);
        res.status(201).json(savedBlog);
    } catch (err) {
        console.error('Error creating blog:', err);
        res.status(400).json({ message: err.message });
    }
});

// READ all blogs
router.get("/blogs", async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
