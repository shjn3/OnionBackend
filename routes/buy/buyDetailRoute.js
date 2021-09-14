import express from "express";
import {
  getListBuyDetail,
  createBuyDetail,
  updateBuyDetail,
  deleteBuyDetail,
} from "../../controllers/buy/buyDetailController.js";
import { isAuth } from "../../token/utils.js";

const router = express.Router();

router.get("/:id", isAuth, getListBuyDetail);
router.post("/", isAuth, createBuyDetail);
router.patch("/:id", isAuth, updateBuyDetail);
router.delete("/:id", isAuth, deleteBuyDetail);

export default router;
