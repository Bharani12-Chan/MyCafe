const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");


// ========================================
// LOAD ENVIRONMENT VARIABLES
// ========================================

dotenv.config();


// ========================================
// IMPORT ROUTES
// ========================================

const authRoutes =
  require("./routes/authRoutes");

const foodRoutes =
  require("./routes/foodRoutes");


// ========================================
// CREATE EXPRESS APP
// ========================================

const app = express();


// ========================================
// MIDDLEWARE
// ========================================

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);


// ========================================
// API ROUTES
// ========================================

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/foods",
  foodRoutes
);


// ========================================
// API TEST
// ========================================

app.get("/api", (req, res) => {

  res.json({
    success: true,
    message:
      "FoodRush API is running successfully 🚀",
  });

});


// ========================================
// REACT PRODUCTION BUILD
// ========================================

// server/server.js
// client/dist
//
// Therefore:
// server -> .. -> client -> dist

const clientDistPath =
  path.join(
    __dirname,
    "../client/dist"
  );


// Serve React static files

app.use(
  express.static(clientDistPath)
);


// ========================================
// REACT ROUTER FALLBACK
// ========================================

// Any route that is NOT /api/*
// should return React index.html.
//
// RegExp is used here so this works cleanly
// with current Express versions.

app.get(/^(?!\/api).*/, (req, res) => {

  res.sendFile(
    path.join(
      clientDistPath,
      "index.html"
    )
  );

});


// ========================================
// DATABASE CONNECTION
// ========================================

mongoose
  .connect(process.env.MONGO_URI)

  .then(() => {

    console.log(
      "MongoDB connected successfully ✅"
    );

  })

  .catch((error) => {

    console.error(
      "MongoDB connection error:",
      error.message
    );

  });


// ========================================
// SERVER PORT
// ========================================

// Render automatically provides PORT.
// Locally it will use 5000.

const PORT =
  process.env.PORT || 5000;


// ========================================
// START SERVER
// ========================================

app.listen(
  PORT,
  "0.0.0.0",
  () => {

    console.log(
      `FoodRush server running on port ${PORT}`
    );

  }
);