import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.log("❌ MongoDB Connection Error:", err.message));

// ✅ User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    picture: String,
});

const User = mongoose.model("User", userSchema);

// ✅ Blog Schema
const blogSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    email: String,
    picture: String,
    createdAt: { type: Date, default: Date.now },
});

const Blog = mongoose.model("Blog", blogSchema);

// ✅ Test Route
app.get("/", (req, res) => {
    res.send("🚀 Backend running successfully!");
});

// ✅ Google Login Route
app.post("/api/auth/google", async (req, res) => {
    try {
        const { name, email, picture } = req.body;

        let user = await User.findOne({ email });
        if (!user) {
            user = new User({ name, email, picture });
            await user.save();
        }

        res.status(200).json({ message: "User authenticated", user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// ✅ Create Blog
app.post("/api/blogs", async (req, res) => {
    try {
        const blog = new Blog(req.body);
        await blog.save();
        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ message: "Error creating blog", error });
    }
});

// ✅ Fetch Blogs
app.get("/api/blogs", async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching blogs", error });
    }
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`🚀 Server running on port ${PORT}`));
