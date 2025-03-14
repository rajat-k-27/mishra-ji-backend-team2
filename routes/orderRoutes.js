const express = require("express");
const {
    getNewOrders,
    acceptOrder,
    rejectOrder,
    getOngoingOrders,
    completeOrder,
    getPastOrders,
    createOrder,
    trackOrder
} = require("../controllers/orderController");

const router = express.Router();

router.get("/new", getNewOrders); // Get all new orders
router.post("/", createOrder); // Create a new order
router.put("/:id/accept", acceptOrder); // Accept an order
router.put("/:id/reject", rejectOrder); // Reject an order
router.get("/ongoing", getOngoingOrders); // Get ongoing orders
router.put("/:id/complete", completeOrder); // Mark order as completed
router.get("/past", getPastOrders); // Get past orders
router.get("/:id/track", trackOrder); // Get order tracking details

module.exports = router;
