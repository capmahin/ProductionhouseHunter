import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      phone: {
        type: String,
        required: true,
      },
      slug: {
        type: String,
        required: true,
      },
      
      photo: {
        data: Buffer,
        contentType: String,
      },
      category:{
        type:mongoose.ObjectId,
        ref:'Category',
        required:true
    },
    
  },
  { timestamps: true }
);

export default mongoose.model("Bookings",  bookingSchema);