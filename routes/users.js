import express from "express";
import {
  deleteUser,
  updateUser,
  getSingleUser,
  getAllUser,
} from '../controllers/userControllers.js';
const router = express.Router();

import { verifyUser,verifyAdmin } from "../utils/verifyToken.js";
// update user
router.put("/:id",verifyUser, updateUser);

// delete user
router.delete("/:id",verifyUser, deleteUser);

// get single user
router.get("/:id",verifyUser, getSingleUser);

// get All user
router.get("/",verifyAdmin, getAllUser);

export default router;
