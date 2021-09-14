import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/auth/userRoute.js";

import customerRoutes from "./routes/customer/customerRoute.js";

import buyRoutes from "./routes/buy/buyRoute.js";
import buyDetailRoutes from "./routes/buy/buyDetailRoute.js";

import saleRoutes from "./routes/sale/saleRoute.js";

const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
//app.use(cors({ credentials: true, origin: "https://oniontwo.herokuapp.com" }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use("/users", userRoutes);

app.use("/buy", buyRoutes);
app.use("/customer", customerRoutes);
app.use("/buydetail", buyDetailRoutes);

app.use("/sale", saleRoutes);
app.get("/", (req, res) => {
  return res.send("hello");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);
