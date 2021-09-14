import express from "express";
import Customer from "../../models/customer/customerModel.js";
import BuyDetail from "../../models/buy/buyDetailModel.js";
import mongoose from "mongoose";

const router = express.Router();

//@desc get List Customer
export const getListCustomer = async (req, res) => {
  try {
    const { type } = req.params;
    const list = await Customer.find({ type: type }).sort({
      _id: -1,
    });
    return res.status(200).json({ success: true, detail: list });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
//@desc create a Customer
export const createCustomer = async (req, res) => {
  try {
    const { full_name, phone_number, type, note } = req.body;
    if (!full_name) {
      return res
        .status(404)
        .json({ success: false, message: "Vui lòng nhập đầy đủ họ tên!!" });
    }

    const newCustomer = new Customer({ full_name, phone_number, type, note });

    await newCustomer.save();

    return res.status(200).json({ success: true, detail: newCustomer });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
//@desc update a Customer
export const updateCustomer = async (req, res) => {
  try {
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
    await Customer.findByIdAndUpdate(
      { _id: id },
      { $set: update },
      { new: true }
    );
    return res.status(200).json({ success: true, detail: update });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//@desc delete a Customer
export const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res
        .status(404)
        .send({ success: false, message: "Không tìm thấy đơn hàng" });
    await BuyDetail.deleteMany({ idCustomer: id });
    await Customer.findByIdAndRemove(id);
    return res.status(200).json({ success: true, message: "Xoá thành công!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default router;
