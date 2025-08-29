const express = require("express");
const VendorRouter = express.Router();
const Vendor = require("../models/Vendor");
const auth = require("../middleware/auth");

// ✅ Add Vendor
VendorRouter.post("/", auth(["Admin", "Manager"]), async(req, res) => {
    try {
        const vendor = new Vendor(req.body);
        await vendor.save();
        res.status(201).json({ message: "Vendor added successfully", vendor });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// ✅ Update Vendor
VendorRouter.put("/:id", auth(["Admin", "Manager"]), async(req, res) => {
    try {
        const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }
        res.json({ message: "Vendor updated successfully", vendor });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// ✅ Deactivate Vendor
VendorRouter.patch("/:id/deactivate", auth(["Admin", "Manager"]), async(req, res) => {
    try {
        const vendor = await Vendor.findByIdAndUpdate(req.params.id, { status: "Inactive" }, { new: true });
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }
        res.json({ message: "Vendor deactivated successfully", vendor });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// ✅ Get All Vendors
VendorRouter.get("/", auth(["Admin", "Manager"]), async(req, res) => {
    try {
        const vendors = await Vendor.find();
        res.json({ message: "Vendors fetched successfully", vendors });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = VendorRouter;