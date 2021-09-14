import express from "express";
import BuyDetail from "../../models/buy/buyDetailModel.js";
import mongoose from "mongoose";
const router = express.Router();

//@DESC get List buy DETAIL
export const getListBuyDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const condition = id.split("+")[0];
    //condition = 0 => filter wither idOwner and idCustomer
    if (condition === "0") {
      const idOwner = id.split("+")[1];
      const idCustomer = id.split("+")[2];
      const list = await BuyDetail.find({ idOwner, idCustomer }).sort({
        _id: -1,
      });
      return res.status(200).json({ success: true, detail: list });
    }
    //condition = 1 => filter with idOwner
    else if (condition === "1") {
      const idOwner = id.split("+")[1];
      const list = await BuyDetail.find({ idOwner }).sort({
        _id: -1,
      });
      return res.status(200).json({ success: true, detail: list });
    }
    // condition = 2 =>filter with idCustomer
    else if (condition === "2") {
      const idCustomer = id.split("+")[1];
      const list = await BuyDetail.find({ idCustomer }).sort({
        _id: -1,
      });
      return res.status(200).json({ success: true, detail: list });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//@DESC create a buy DETAIL
export const createBuyDetail = async (req, res) => {
  try {
    console.log(req.body);
    const {
      idOwner,
      idCustomer,
      note,
      status,
      box_l,
      box_m,
      box_s,
      bags,
      price,
    } = req.body;
    if (!status || !price) {
      return res.status(404).json({
        success: false,
        message: "Vui lòng nhập đầy đủ Tiền, Hình thức mua!!",
      });
    } else {
      const newBuy = new BuyDetail({
        idOwner,
        idCustomer,
        note,
        status,
        box_l,
        box_m,
        box_s,
        bags,
        price,
      });
      await newBuy.save();
      return res.status(200).json({ success: true, detail: newBuy });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//@DESC update a buy DETAIL
export const updateBuyDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const { note, status, box_l, box_m, box_s, bags, price, idCustomer } =
      req.body;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res
        .status(404)
        .send({ success: false, message: "Không tìm thấy đơn hàng" });
    const update = {};
    if (note) update.note = note;
    if (status) update.status = status;
    if (box_l) update.box_l = box_l;
    if (box_m) update.box_m = box_m;
    if (box_s) update.box_s = box_s;
    if (bags) update.bags = bags;
    if (price) update.price = price;
    if (idCustomer) update.idCustomer = idCustomer;

    await BuyDetail.findByIdAndUpdate(
      { _id: id },
      { $set: update },
      { new: true }
    );

    return res.status(200).json({ success: true, detail: update });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Cập nhật không thành công" });
  }
};

//@DESC delete a buy DETAIL
export const deleteBuyDetail = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res
        .status(404)
        .send({ success: false, message: "Không tìm thấy đơn hàng" });
    await BuyDetail.findByIdAndRemove(id);

    return res.status(200).json({ success: true, message: "Xoá thành công!" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Xóa không thành công!" });
  }
};

export default router;
