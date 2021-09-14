import mongoose from "mongoose";
const bag = {
  type: { type: Number },
  kilo: Number,
  total: Number,
  price: Number,
};
const saleSchema = mongoose.Schema({
  saler: { type: String, require: true },
  phone_number: String,
  note: String,
  bags: [bag],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var Sale = mongoose.model("Sale", saleSchema);

export default Sale;
