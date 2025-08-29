const express = require("express");
const CustomerRouter = express.Router();
const Customer = require("../models/Customer");
const auth = require("../middleware/auth");

// ➕ Add Customer
CustomerRouter.post("/", auth(["Admin", "Manager"]), async(req, res) => {
    try {
        const customer = new Customer(req.body);
        await customer.save();
        res.status(201).json({ message: "Customer added successfully", customer });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// ✏️ Update Customer
CustomerRouter.put("/:id", auth(["Admin", "Manager"]), async(req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!customer) return res.status(404).json({ message: "Customer not found" });
        res.json({ message: "Customer updated successfully", customer });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🚫 Deactivate Customer
CustomerRouter.put("/:id/deactivate", auth(["Admin", "Manager"]), async(req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(
            req.params.id, { status: "Deactivated" }, { new: true }
        );
        if (!customer) return res.status(404).json({ message: "Customer not found" });
        res.json({ message: "Customer deactivated successfully", customer });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 💰 Track Payments
CustomerRouter.post("/:id/payment", auth(["Admin", "Manager"]), async(req, res) => {
    try {
        const { amount, reference } = req.body;
        const customer = await Customer.findByIdAndUpdate(
            req.params.id, { $push: { payments: { amount, date: new Date(), reference } } }, { new: true }
        );
        if (!customer) return res.status(404).json({ message: "Customer not found" });
        res.json({ message: "Payment recorded", customer });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📝 Log Complaint
CustomerRouter.post("/:id/complaint", auth(["Admin", "Manager", "Employee"]), async(req, res) => {
    try {
        const { issue } = req.body;
        const customer = await Customer.findByIdAndUpdate(
            req.params.id, { $push: { complaints: { issue } } }, { new: true }
        );
        if (!customer) return res.status(404).json({ message: "Customer not found" });
        res.json({ message: "Complaint logged", customer });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📋 Get All Customers
CustomerRouter.get("/", auth(["Admin", "Manager"]), async(req, res) => {
    try {
        const customers = await Customer.find();
        res.json({ customers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = CustomerRouter;