import express from "express";
import {
  getListDriver,
  createDriver,
  updateDriver,
  deleteDriver,
} from "../../controllers/driver/driverController.js";
import { isAuth } from "../../token/utils.js";

const router = express.Router();

router.get("/", getListDriver);
router.post("/", createDriver);
router.patch("/:id", updateDriver);
router.delete("/:id", deleteDriver);

export default router;
