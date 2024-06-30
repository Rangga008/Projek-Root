import express from "express";
import bodyParser from "body-parser";
import productRoutes from "./routes/productRoutes.js";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Use product routes
app.use("/api", productRoutes);

// Root route
app.get("/", (req, res) => {
	res.send("Welcome to the Product API");
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
