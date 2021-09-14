import express from "express";
import {
  getListBuy,
  createBuy,
  updateBuy,
  deleteBuy,
} from "../../controllers/buy/buyController.js";
import { isAuth } from "../../token/utils.js";

const router = express.Router();

router.get("/", isAuth, getListBuy);
router.post("/", isAuth, createBuy);
router.patch("/:id", isAuth, updateBuy);
router.delete("/:id", isAuth, deleteBuy);

export default router;
