const express = require("express");
const mongoose = require("mongoose");
const AttendanceRouter = express.Router();
const Attendance = require("../models/Attendance");
const auth = require("../middleware/auth");

// ==============================
// ✏️ Update Attendance
// ==============================
AttendanceRouter.put("/:id", auth(["Admin", "Manager", "Employee"]), async(req, res) => {
    try {
        const { in_time, out_time, status } = req.body;

        // Fetch attendance first
        const attendance = await Attendance.findById(req.params.id);
        if (!attendance) {
            return res.status(404).json({ message: "Attendance record not found" });
        }

        // Employees can only update their own attendance
        if (req.user.role === "Employee" && attendance.employee_id.toString() !== req.user.id) {
            return res.status(403).json({ message: "You cannot update someone else's attendance" });
        }

        // Update record
        attendance.in_time = in_time || attendance.in_time;
        attendance.out_time = out_time || attendance.out_time;
        attendance.status = status || attendance.status;

        await attendance.save();

        res.json({ message: "Attendance updated successfully", attendance });
    } catch (err) {
        res.status(500).json({ message: "Error updating attendance", error: err.message });
    }
});

// ==============================
// 📝 Mark Attendance
// ==============================
AttendanceRouter.post("/", auth(["Admin", "Manager", "Employee"]), async(req, res) => {
    try {
        let { employee_id, attendance_date, in_time, out_time, status } = req.body;

        // Force employee to mark only their own attendance
        if (req.user.role === "Employee") {
            employee_id = req.user.id;
        }

        // Convert employee_id to ObjectId
        employee_id = mongoose.Types.ObjectId(employee_id);

        // Check if attendance already exists for this date
        const existing = await Attendance.findOne({ employee_id, attendance_date });
        if (existing) {
            return res.status(400).json({ message: "Attendance already marked for this date" });
        }

        const newAttendance = await Attendance.create({
            employee_id,
            attendance_date,
            in_time,
            out_time,
            status: status || "Present",
        });

        res.status(201).json({ message: "Attendance marked successfully", newAttendance });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==============================
// 🚨 Mark Leave
// ==============================
AttendanceRouter.post("/leave", auth(["Admin", "Manager", "Employee"]), async(req, res) => {
    try {
        let { employee_id, attendance_date } = req.body;

        // Employees can only mark leave for themselves
        if (req.user.role === "Employee") {
            employee_id = req.user.id;
        }

        employee_id = mongoose.Types.ObjectId(employee_id);

        // Check if attendance/leave already exists
        const existing = await Attendance.findOne({ employee_id, attendance_date });
        if (existing) {
            return res.status(400).json({ message: "Attendance/Leave already marked for this date" });
        }

        const newLeave = await Attendance.create({
            employee_id,
            attendance_date,
            status: "On Leave",
        });

        res.status(201).json({ message: "Leave marked successfully", newLeave });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==============================
// 📋 Get Attendance History
// ==============================
AttendanceRouter.get("/", auth(["Admin", "Manager", "Employee"]), async(req, res) => {
    try {
        let filter = {};

        // Employees can only see their own records
        if (req.user.role === "Employee") {
            filter.employee_id = mongoose.Types.ObjectId(req.user.id);
        }
        // Admin/Manager can filter by employee_id
        else if (req.query.employee_id) {
            filter.employee_id = mongoose.Types.ObjectId(req.query.employee_id);
        }

        const attendanceHistory = await Attendance.find(filter)
            .populate("employee_id") // make sure this points to your Employee collection
            .sort({ attendance_date: -1 }); // latest first

        res.json({ message: "Attendance history fetched successfully", attendanceHistory });
    } catch (err) {
        res.status(500).json({ message: "Error fetching attendance history", error: err.message });
    }
});

module.exports = AttendanceRouter;