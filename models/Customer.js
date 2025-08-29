const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
    customer_code: {
        type: String,
        unique: true,
        required: true
    },
    customer_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone_number: {
        type: String,
        unique: true,
        required: true
    },
    status: {
        type: String,
        enum: ["Active", "Deactivated"],
        default: "Active"
    },
    payments: [{
        amount: Number,
        date: Date,
        reference: String
    }],
    complaints: [{
        issue: String,
        date: {
            type: Date,
            default: Date.now
        },
        resolved: {
            type: Boolean,
            default: false
        }
    }]
}, { timestamps: true });

const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;