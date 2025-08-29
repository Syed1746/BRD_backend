const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    employee_code: {
        type: String,
        unique: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone_number: {
        type: String
    },
    date_of_birth: {
        type: Date
    },
    date_of_joining: {
        type: Date,
        required: true
    },
    department: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true
    },
    reporting_manager_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Employee"
    },
    active: {
        type: String,
        enum: ["Active", "Inactive", "On Leave"],
        default: "Active"
    },
}, {
    timestamps: true
})
const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;