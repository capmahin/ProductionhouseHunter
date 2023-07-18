import bookingModel from "../models/bookingModel.js";
import categoryModel from '../models/categoryModel.js'
import fs from "fs";
import slugify from "slugify";

export const createBookingController = async (req, res) => {
  try {
    const { name, email, phone,category} =
      req.fields;
      const { photo } = req.files;
    
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !email:
        return res.status(500).send({ error: "Email is Required" });
      
      case !phone:
        return res.status(500).send({ error: "phone number is Required" });

        
        case !category:
          return res.status(500).send({error:'Category required'})
      
        case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
     
    }
    

    const bookings = new bookingModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
        bookings.photo.data = fs.readFileSync(photo.path);
      bookings.photo.contentType = photo.type;
    }
    await  bookings.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      bookings,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing booking",
    });
  }
};

//get all products
export const getBookingController = async (req, res) => {
  try {
    const bookings = await bookingModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: bookings.length,
      message: "ALlbookings ",
      bookings,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting bookings",
      error: error.message,
    });
  }
};
// get single booking
export const getSingleBookingController = async (req, res) => {
  try {
    const booking = await bookingModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single booking Fetched",
      booking,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single booking",
      error,
    });
  }
};

// get photo
export const bookingPhotoController = async (req, res) => {
  try {
    const  booking = await  bookingModel.findById(req.params.pid).select("photo");
    if ( booking.photo.data) {
      res.set("Content-type",  booking.photo.contentType);
      return res.status(200).send( booking.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

// booking controller
export const deleteBookingController = async (req, res) => {
  try {
    await  bookingModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: " booking Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting  booking",
      error,
    });
  }
};
//upate producta
export const updateBookingController = async (req, res) => {
  try {
    const { name, email, phone, category} =
      req.fields;
      const { photo } = req.files;
    
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !email:
        return res.status(500).send({ error: "Email is Required" });
      
      case !phone:
        return res.status(500).send({ error: "phone number is Required" });
     
      case !category:
        return res.status(500).send({ error: "Category is Required" });
        case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
     
    }

    const  booking = await  bookingModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
        booking.photo.data = fs.readFileSync(photo.path);
        booking.photo.contentType = photo.type;
    }
    await  booking.save();
    res.status(201).send({
      success: true,
      message: " booking Updated Successfully",
      booking,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};

