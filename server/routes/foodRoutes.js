const express = require("express");

const Food = require("../models/Food");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const router = express.Router();

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80";


// GET ALL FOODS

router.get("/", async (req, res) => {
  try {
    const foods = await Food
      .find()
      .sort({ createdAt: -1 });

    res.json(foods);

  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch foods.",
    });
  }
});


// ADD FOOD - ADMIN

router.post(
  "/",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const {
        name,
        description,
        category,
        price,
        image,
      } = req.body;

      if (
        !name ||
        !description ||
        !category ||
        price === undefined ||
        price === ""
      ) {
        return res.status(400).json({
          message:
            "Please complete all required fields.",
        });
      }

      const numericPrice = Number(price);

      if (
        Number.isNaN(numericPrice) ||
        numericPrice < 0
      ) {
        return res.status(400).json({
          message: "Invalid food price.",
        });
      }

      const food = await Food.create({
        name: name.trim(),
        description: description.trim(),
        category: category.trim(),
        price: numericPrice,

        image:
          image && image.trim()
            ? image.trim()
            : DEFAULT_IMAGE,
      });

      res.status(201).json(food);

    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Unable to add food.",
      });
    }
  }
);


// DELETE FOOD - ADMIN

router.delete(
  "/:id",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const food = await Food.findById(
        req.params.id
      );

      if (!food) {
        return res.status(404).json({
          message: "Food not found.",
        });
      }

      await food.deleteOne();

      res.json({
        message:
          "Food deleted successfully.",
      });

    } catch (error) {
      res.status(500).json({
        message: "Unable to delete food.",
      });
    }
  }
);

module.exports = router;