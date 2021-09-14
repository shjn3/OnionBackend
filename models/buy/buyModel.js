import mongoose from "mongoose";

const buySchema = mongoose.Schema({
  full_name: { type: String, require: true },
  phone_number: String,
  note: String,
  status: Number, // 1 : chưa trả tiền , 2: đã cọc , 3 : đã trả xong
  deposit: { type: Number, default: 0 },
  area: { type: Number, require: true },
  type_buy: { type: Number, require: true }, // 1: cân kí ,2 : mua xào
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var Buy = mongoose.model("Buy", buySchema);

export default Buy;
