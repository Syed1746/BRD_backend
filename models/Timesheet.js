const mongoose = require("mongoose");

const TimesheetSchema = new mongoose.Schema({
    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    },
    hours_worked: {
        type: Number,
        required: true,
        min: 0,
        max: 24
    },
    task_description: {
        type: String
    },
    status: {
        type: String,
        enum: ["Submitted", "Approved", "Rejected"],
        default: "Submitted"
    }
}, { timestamps: true });

const Timesheet = mongoose.model("Timesheet", TimesheetSchema);
module.exports = Timesheet;