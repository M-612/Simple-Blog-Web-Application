import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import blogRoutes from "./routes/blogRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
// Allow development frontends on common ports (3000 and 3001). In production, set a specific origin.
app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (like curl, mobile apps)
        if (!origin) return callback(null, true);
        const allowed = ['http://localhost:3000', 'http://localhost:3001'];
        if (allowed.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            // You can change this to callback(null, true) to allow all origins in dev
            callback(new Error('CORS policy: origin not allowed'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// ✅ MongoDB connection
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection Error:", err));

// ✅ Use routes
app.use('/api', blogRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

