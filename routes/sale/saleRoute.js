import express from "express";
import {
  createSale,
  deleteSale,
  getListSale,
  updateSale,
} from "../../controllers/sale/saleController.js";
import { isAuth } from "../../token/utils.js";

const router = express.Router();

router.get("/", isAuth, getListSale);
router.post("/create", isAuth, createSale);

router.patch("/edit/:id", updateSale);
router.delete("/delete/:id", deleteSale);

export default router;
