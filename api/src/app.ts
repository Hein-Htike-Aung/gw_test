import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler";
import CustomerRouter from "./routes/customer.routes";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL!);
    console.log("CONNECTED TO DB");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MONGO DB DISCONNECTED!!!");
});

app.use(cors());
app.use(express.json());

app.use('/api/customer', CustomerRouter);

app.use(errorHandler);

app.listen(8800, () => {
  connect();
  console.log("CONNECTED TO BACKEND SERVER");
});
