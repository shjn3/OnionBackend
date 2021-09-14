import express from "express";
import Sale from "../../models/sale/saleModel.js";
import mongoose from "mongoose";
const router = express.Router();

export const getListSale = async (req, res) => {
  try {
    const list = await Sale.find().sort({ _id: -1 });
    res.status(200).json({ success: true, detail: list });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// export const getDetailBuy = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const post = await PostMessage.findById(id);

//         res.status(200).json(post);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// }

export const createSale = async (req, res) => {
  try {
    const { saler, phone_number, note, bags } = req.body;
    if (!saler || !bags) {
      res.status(404).json({
        success: false,
        message: "Vui lòng nhập đầy đủ họ tên, bao !!",
      });
    } else {
      const newSale = new Sale({ saler, phone_number, note, bags });
      await newSale.save();
      res.status(201).json({ success: true, detail: newSale });
    }
  } catch (error) {
    res.status(409).json({ success: false, message: error.message });
  }
};

export const updateSale = async (req, res) => {
  const { id } = req.params;
  const { saler, phone_number, note, bags } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(404)
      .send({ success: false, message: "Không tìm thấy đơn hàng" });
  const update = {};
  if (saler) update.saler = saler;
  if (phone_number) update.phone_number = phone_number;
  if (note) update.note = note;
  if (bags) update.bags = bags;
  await Buy.findByIdAndUpdate({ _id: id }, { $set: update }, { new: true });
  res.status(201).json({ success: true, detail: update });
};

export const deleteSale = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(404)
      .send({ success: false, message: "Không tìm thấy đơn hàng" });

  await Sale.findByIdAndRemove(id);

  res.json({ success: true, message: "Xoá thành công!" });
};

export default router;
