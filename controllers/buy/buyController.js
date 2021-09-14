import express from "express";
import Buy from "../../models/buy/buyModel.js";
import BuyDetail from "../../models/buy/buyDetailModel.js";
import mongoose from "mongoose";
const router = express.Router();

//@desc get list BUY
export const getListBuy = async (req, res) => {
  try {
    const list = await Buy.find().sort({ _id: -1 });
    return res.status(200).json({
      success: true,
      detail: list,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//@desc create a BUY
export const createBuy = async (req, res) => {
  try {
    const { full_name, phone_number, note, status, deposit, area, type_buy } =
      req.body;

    if (!full_name || !status || !area || !type_buy) {
      return res.status(404).json({
        success: false,
        message:
          "Vui lòng nhập đầy đủ họ tên, Trạng thái, Diện tích, Hình thức mua!!",
      });
    }

    const newBuy = new Buy({
      full_name,
      phone_number,
      note,
      status,
      deposit,
      area,
      type_buy,
    });
    await newBuy.save();
    return res.status(200).json({ success: true, detail: newBuy });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
//@desc update a BUY
export const updateBuy = async (req, res) => {
  try {
    const { id } = req.params;
    const { full_name, phone_number, note, status, deposit, area, type_buy } =
      req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res
        .status(404)
        .send({ success: false, message: "Không tìm thấy đơn hàng" });
    const update = {};
    if (full_name) update.full_name = full_name;
    if (phone_number) update.phone_number = phone_number;
    if (note) update.note = note;
    if (status) update.status = status;
    if (deposit) update.deposit = deposit;
    if (area) update.area = area;
    if (type_buy) update.type_buy = type_buy;
    await Buy.findByIdAndUpdate({ _id: id }, { $set: update }, { new: true });
    return res.status(200).json({ success: true, detail: update });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//@desc delete a BUY
export const deleteBuy = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res
        .status(404)
        .send({ success: false, message: "Không tìm thấy đơn hàng" });
    await BuyDetail.deleteMany({ idOwner: id });
    await Buy.findByIdAndRemove(id);
    return res.status(200).json({ success: true, message: "Xoá thành công!" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server error" });
  }
};

export default router;
