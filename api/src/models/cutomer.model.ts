import mongoose from "mongoose";

export interface CustomerDocument extends mongoose.Document {
  name: string;
  birthday: Date;
  gender: "MALE" | "FEMALE";
  address: string;
  phoneNumber: string;
  favoriteItems: string[];
}

const CustomerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE"],
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    favoriteItems: [
      {
        type: String,
        enum: [
          "Pancakes",
          "Cupcakes",
          "Cheesecake",
          "Cookies",
          "Donuts",
          "Croissant",
        ],
        required: true,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.customerId = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const Customer = mongoose.model<CustomerDocument>("Customer", CustomerSchema);
export default Customer;
