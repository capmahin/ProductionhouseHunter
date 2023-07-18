import express from "express";
import {
  createBookingController,
  deleteBookingController,
  getBookingController,
  getSingleBookingController,
//  bookingCategoryController,
//  bookingCountController,
//  bookingFiltersController,
//  bookingListController,
 bookingPhotoController,
//   realtedBookingController,
//   searchBookingController,
  updateBookingController,
} from "../controllers/bookingController.js"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
  "/create-booking",
  requireSignIn,
 
  formidable(),
  createBookingController
);
//routes
router.put(
  "/update-booking/:pid",
  requireSignIn,
  
  formidable(),
  updateBookingController
);

//get products
router.get("/get-booking", getBookingController);

//single product
router.get("/get-booking/:slug", getSingleBookingController);

//get photo
router.get("/booking-photo/:pid", bookingPhotoController);

//delete rproduct
router.delete("/delete-booking/:pid", deleteBookingController);

//filter product
// router.post("/product-filters", productFiltersController);

//product count
// router.get("/product-count", productCountController);

//product per page
// router.get("/product-list/:page", productListController);

//search product
// router.get("/search/:keyword", searchProductController);

//similar product
// router.get("/related-product/:pid/:cid", realtedProductController);

//category wise product
// router.get("/product-category/:slug", productCategoryController);

export default router;