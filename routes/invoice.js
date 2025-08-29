const express = require("express");
const InvoiceRouter = express.Router();
const Invoice = require("../models/Invoice");
const auth = require("../middleware/auth");

// ➕ Create Invoice
InvoiceRouter.post("/", auth(["Admin", "Manager"]), async(req, res) => {
    try {
        const invoice = new Invoice(req.body);
        await invoice.save();
        res.status(201).json({ message: "Invoice created successfully", invoice });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// ✏️ Update Invoice
InvoiceRouter.put("/:id", auth(["Admin", "Manager"]), async(req, res) => {
    try {
        const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!invoice) return res.status(404).json({ message: "Invoice not found" });
        res.json({ message: "Invoice updated successfully", invoice });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 📄 Get Invoices (all or by customer/vendor)
InvoiceRouter.get("/", auth(["Admin", "Manager"]), async(req, res) => {
    try {
        const { customer_id, vendor_id } = req.query;
        let filter = {};
        if (customer_id) filter.customer_id = customer_id;
        if (vendor_id) filter.vendor_id = vendor_id;

        const invoices = await Invoice.find(filter)
            .populate("customer_id vendor_id");
        res.json({ invoices });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = InvoiceRouter;