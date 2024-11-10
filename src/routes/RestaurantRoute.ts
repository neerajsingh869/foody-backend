import express from "express";
import { param } from "express-validator";

import RestaurantController from "../controllers/RestaurantController";

const router = express.Router();

router.get(
  "/:restaurantId",
  param("restaurantId")
    .isString()
    .trim()
    .isEmpty()
    .withMessage("RestaurantId must be a valid string"),
  RestaurantController.getRestaurant
);
router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .isEmpty()
    .withMessage("City must be a valid string"),
  RestaurantController.searchRestaurant
);

export default router;
