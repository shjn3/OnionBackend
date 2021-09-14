import express from "express";
import Driver from "../../models/driver/driverModel.js";
import BuyDetail from "../../models/buy/buyDetailModel.js";
import mongoose from "mongoose";

const router = express.Router();

//@desc get List DRIVER
export const getListDriver = async (req, res) => {
  try {
    const list = await Driver.find().sort({ _id: -1 });
    res.status(200).json({ success: true, detail: list });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};
//@desc create a DRIVER
export const createDriver = async (req, res) => {
  try {
    const { full_name, phone_number, note } = req.body;
    if (!full_name) {
      res
        .status(404)
        .json({ success: false, message: "Vui lòng nhập đầy đủ họ tên!!" });
    } else {
      const newDriver = new Driver({ full_name, phone_number, note });
      await newDriver.save();
      res.status(201).json({ success: true, detail: newDriver });
    }
  } catch (error) {
    res.status(409).json({ success: false, message: error.message });
  }
};
//@desc update a DRIVER
export const updateDriver = async (req, res) => {
  const { id } = req.params;
  const { full_name, phone_number, note } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(404)
      .send({ success: false, message: "Không tìm thấy tài xế" });
  const update = {};
  if (full_name) update.full_name = full_name;
  if (phone_number) update.phone_number = phone_number;
  if (note) update.note = note;
  await Driver.findByIdAndUpdate({ _id: id }, { $set: update }, { new: true });
  res.status(201).json({ success: true, detail: update });
};

//@desc delete a DRIVER
export const deleteDriver = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(404)
      .send({ success: false, message: "Không tìm thấy đơn hàng" });
  await Driver.findByIdAndRemove(id);
  await BuyDetail.deleteMany({ idDriver: id });
  res.json({ success: true, message: "Xoá thành công!" });
};

export default router;
