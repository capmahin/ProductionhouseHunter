import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    phone: {
        type: String,
        required: true,
      },
    size:{
        type: String,
        required: true,
      },
    bedroom:{
        type: String,
        required: true,
      },
    bathroom:{
        type: String,
        required: true,
      },
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      required: true,
    },
    date: {
      type: Number,
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    
  },
  { timestamps: true }
);

export default mongoose.model("Products", productSchema);