const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
    employee_id: {
        type: mongoose.Schema.ObjectId,
        ref: "Employee",
        required: true
    },
    attendance_date: {
        type: Date,
        required: true
    },
    in_time: {
        type: String
    },
    out_time: {
        type: String
    },
    status: {
        type: String,
        enum: ["Present", "Absent", "On Leave"],
        default: "Present"
    }
}, { timestamps: true })

const Attendance = mongoose.model("Attendance", AttendanceSchema);

module.exports = Attendance;