import express from "express";
import {
  createCoffee,
  deleteCoffee,
  getAllCoffee,
  getSingleCoffee,
  updateCoffee,
} from '../controllers/coffeeControllers.js'
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//post new Coffee
router.post("/", createCoffee);

// update Coffee
router.put("/:id",verifyAdmin, updateCoffee);

// delete Coffee
router.delete("/:id",verifyAdmin, deleteCoffee);

// get single Coffee
router.get("/:id", getSingleCoffee);

// get All Coffee
router.get("/", getAllCoffee);

// get Coffee by search
// router.get("/search/getCoffeeBySearch", getCoffeeBySearch);
// router.get("/search/getFeaturedCoffees", getFeaturedCoffee);
// router.get("/search/getCoffeeCount", getCoffeeCount);

export default router;