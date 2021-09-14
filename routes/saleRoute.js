import express from "express";
import {
  createSale,
  deleteSale,
  getListSale,
  updateSale,
} from "../controllers/saleController.js";

const router = express.Router();

router.get("/", getListSale);
router.post("/create", createSale);
// router.post('/', createPost);
// router.get('/:id', getPost);
router.patch("/edit/:id", updateSale);
router.delete("/delete/:id", deleteSale);
// router.patch('/:id/likePost', likePost);

export default router;
