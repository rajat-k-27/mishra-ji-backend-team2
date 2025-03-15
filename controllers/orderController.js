const Order = require("../models/order");

// Get all new orders
exports.getNewOrders = async (req, res) => {
    try {
        const orders = await Order.find({ status: "New" }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Accept an order
exports.acceptOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: "Ongoing" },
            { new: true }
        );
        if (!order) return res.status(404).json({ message: "Order not found" });

        res.json({ message: "Order accepted", order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Reject an order
exports.rejectOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: "Canceled" },
            { new: true }
        );
        if (!order) return res.status(404).json({ message: "Order not found" });

        res.json({ message: "Order rejected", order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get ongoing orders
exports.getOngoingOrders = async (req, res) => {
    try {
        const orders = await Order.find({ status: "Ongoing" }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mark order as completed
exports.completeOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: "Completed" },
            { new: true }
        );
        if (!order) return res.status(404).json({ message: "Order not found" });

        res.json({ message: "Order marked as completed", order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get past orders (Completed + Canceled)
exports.getPastOrders = async (req, res) => {
    try {
        const orders = await Order.find({ status: { $in: ["Completed", "Canceled"] } }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get order tracking details
exports.trackOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });

        // Dummy tracking response (Replace with actual tracking data)
        res.json({
            orderId: order._id,
            status: order.status,
            location: "In Transit",
            estimatedDelivery: "2025-03-16", // Example date
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new order
exports.createOrder = async (req, res) => {
    try {
        const { sellerId, customerName, items, totalAmount } = req.body;

        // Validation
        if (!sellerId || !customerName || !items || items.length === 0 || !totalAmount) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newOrder = new Order({
            sellerId,
            customerName,
            items,
            totalAmount,
            status: "New", // Default status
        });

        await newOrder.save();
        res.status(201).json({ message: "Order created successfully", order: newOrder });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};  
