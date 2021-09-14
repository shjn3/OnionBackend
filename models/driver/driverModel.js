import mongoose from "mongoose";

const driverSchema = mongoose.Schema({
  full_name: { type: String, require: true },
  phone_number: String,
  note: String,
});

var Driver = mongoose.model("Driver", driverSchema);

export default Driver;
