import express from "express";
import  { updateLocation, getRoute } from "../controllers/trackingController.js"; 


const router = express.Router();

router.post("/update", updateLocation);
router.get("/route", getRoute);

export default router;