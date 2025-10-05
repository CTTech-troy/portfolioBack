// src/app.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import contactRoutes from "./routes/contact.js";

dotenv.config();
const app = express();

// ✅ Allow requests from your React app (http://localhost:5173)
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://abdulsalam-portfolio.netlify.app"
  ],
  methods: ["GET", "POST"],
  credentials: true, // optional (if you use cookies or auth)
}));

app.use(express.json());
app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => {
  res.send("Contact Backend is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
