import express from "express";
import {
  createCustomer,
  deleteCustomer,
  getListCustomer,
  updateCustomer,
} from "../../controllers/customer/customerController.js";
import { isAuth } from "../../token/utils.js";

const router = express.Router();

router.get("/:type", isAuth, getListCustomer);
router.post("/create", isAuth, createCustomer);
router.patch("/:id", isAuth, updateCustomer);
router.delete("/:id", isAuth, deleteCustomer);

export default router;
