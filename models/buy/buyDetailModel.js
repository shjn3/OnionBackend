import mongoose from "mongoose";

const bag = {
  key: { type: String, require: true },
  type: { type: Number, require: true },
  kilo: { type: Number, require: true },
  total: { type: Number, require: true },
};
const buyDetailSchema = mongoose.Schema({
  idOwner: { type: mongoose.Schema.Types.ObjectId, ref: "Buy", required: true },
  idCustomer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  note: String,
  status: Number,
  box_l: Number,
  box_m: Number,
  box_s: Number,
  bags: [bag],
  price: Number,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var BuyDetail = mongoose.model("BuyDetail", buyDetailSchema);

export default BuyDetail;
