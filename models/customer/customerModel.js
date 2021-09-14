import mongoose from "mongoose";

const customerSchema = mongoose.Schema({
  full_name: { type: String, require: true },
  type : {type : Number,default : 1 , enum : [1,2]},
  phone_number: String,
  note: String,
});

var Customer = mongoose.model("Driver", customerSchema);

export default Customer;
