const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({
    invoice_number: {
        type: String,
        unique: true,
        required: true
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    vendor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor"
    },
    date: {
        type: Date,
        default: Date.now
    },
    due_date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Paid", "Overdue"],
        default: "Pending"
    },
    description: {
        type: String
    }
}, { timestamps: true });

const Invoice = mongoose.model("Invoice", InvoiceSchema);
module.exports = Invoice;