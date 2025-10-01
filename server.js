const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/vendorDashboard")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: "yourSecretKey",
  resave: false,
  saveUninitialized: true,
}));

app.use(flash());


// Serve static files from /public at root
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", dashboardRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).send("Page not found");
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
