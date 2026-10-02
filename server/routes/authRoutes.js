const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User =
  require("../models/User");

const router = express.Router();


// ========================================
// GENERATE JWT
// ========================================

const generateToken = (user) => {

  return jwt.sign(

    {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },

    process.env.JWT_SECRET,

    {
      expiresIn: "7d",
    }

  );

};


// ========================================
// REGISTER
// POST /api/auth/register
// ========================================

router.post(
  "/register",
  async (req, res) => {

    try {

      const {
        name,
        email,
        password,
      } = req.body;


      // ==================================
      // VALIDATION
      // ==================================

      if (
        !name ||
        !email ||
        !password
      ) {

        return res
          .status(400)
          .json({
            message:
              "All fields are required.",
          });

      }


      if (password.length < 6) {

        return res
          .status(400)
          .json({
            message:
              "Password must be at least 6 characters.",
          });

      }


      // ==================================
      // NORMALIZE EMAIL
      // ==================================

      const normalizedEmail =
        email
          .toLowerCase()
          .trim();


      // ==================================
      // CHECK EXISTING USER
      // ==================================

      const existingUser =
        await User.findOne({
          email: normalizedEmail,
        });


      if (existingUser) {

        return res
          .status(400)
          .json({
            message:
              "This email is already registered.",
          });

      }


      // ==================================
      // HASH PASSWORD
      // ==================================

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );


      // ==================================
      // ADMIN EMAIL
      // ==================================

      const adminEmail =
        process.env.ADMIN_EMAIL
          ?.toLowerCase()
          .trim();


      const userRole =
        normalizedEmail === adminEmail
          ? "admin"
          : "user";


      // ==================================
      // CREATE USER
      // ==================================

      const user =
        await User.create({

          name: name.trim(),

          email:
            normalizedEmail,

          password:
            hashedPassword,

          role:
            userRole,

        });


      // ==================================
      // GENERATE TOKEN
      // ==================================

      const token =
        generateToken(user);


      // ==================================
      // RESPONSE
      // ==================================

      res
        .status(201)
        .json({

          message:
            userRole === "admin"
              ? "Admin account created successfully."
              : "Registration successful.",

          token,

          user: {

            id: user._id,

            name: user.name,

            email: user.email,

            role: user.role,

          },

        });


    } catch (error) {

      console.error(
        "Registration Error:",
        error
      );


      res
        .status(500)
        .json({
          message:
            "Server error during registration.",
        });

    }

  }
);


// ========================================
// LOGIN
// POST /api/auth/login
// ========================================

router.post(
  "/login",
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;


      // ==================================
      // VALIDATION
      // ==================================

      if (!email || !password) {

        return res
          .status(400)
          .json({
            message:
              "Email and password are required.",
          });

      }


      // ==================================
      // NORMALIZE EMAIL
      // ==================================

      const normalizedEmail =
        email
          .toLowerCase()
          .trim();


      // ==================================
      // FIND USER
      // ==================================

      const user =
        await User.findOne({
          email: normalizedEmail,
        });


      if (!user) {

        return res
          .status(401)
          .json({
            message:
              "Invalid email or password.",
          });

      }


      // ==================================
      // VERIFY PASSWORD
      // ==================================

      const validPassword =
        await bcrypt.compare(
          password,
          user.password
        );


      if (!validPassword) {

        return res
          .status(401)
          .json({
            message:
              "Invalid email or password.",
          });

      }


      // ==================================
      // GENERATE TOKEN
      // ==================================

      const token =
        generateToken(user);


      // ==================================
      // RESPONSE
      // ==================================

      res
        .status(200)
        .json({

          message:
            user.role === "admin"
              ? "Admin login successful."
              : "Login successful.",

          token,

          user: {

            id: user._id,

            name: user.name,

            email: user.email,

            role: user.role,

          },

        });


    } catch (error) {

      console.error(
        "Login Error:",
        error
      );


      res
        .status(500)
        .json({
          message:
            "Server error during login.",
        });

    }

  }
);


module.exports = router;