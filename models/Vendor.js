const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema({
    vendor_code: {
        type: String,
        unique: true,
        required: true
    },
    vendor_name: {
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
        enum: ["Active", "Inactive"],
        default: "Active"
    }
}, { timestamps: true });

const Vendor = mongoose.model("Vendor", VendorSchema);

module.exports = Vendor;