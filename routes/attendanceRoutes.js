const express = require("express");
const AttendanceRouter = express.Router();
const Attendance = require("../models/Attendance");
const auth = require("../middleware/auth");

// 📝 Mark Attendance
AttendanceRouter.post("/", auth(["Admin", "Manager", "Employee"]), async(req, res) => {
    try {
        const { employee_id, attendance_date, in_time, out_time, status } = req.body;

        const existing = await Attendance.findOne({ employee_id, attendance_date });
        if (existing) {
            return res.status(400).json({ message: "Attendance already marked for this date" });
        }

        const MarkAttendance = await Attendance.create({
            employee_id,
            attendance_date,
            in_time,
            out_time,
            status,
        });

        res.status(201).json({ message: "Attendance marked successfully", MarkAttendance });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✏️ Update Attendance
AttendanceRouter.put("/:id", auth(["Admin", "Manager", "Employee"]), async(req, res) => {
    try {
        const { in_time, out_time, status } = req.body;

        const attendance = await Attendance.findByIdAndUpdate(
            req.params.id, { in_time, out_time, status }, { new: true }
        );

        if (!attendance) {
            return res.status(404).json({ message: "Attendance record not found" });
        }

        res.json({ message: "Attendance updated successfully", attendance });
    } catch (err) {
        res.status(500).json({ message: "Error updating attendance", error: err.message });
    }
});

// 🚨 Mark Leave
AttendanceRouter.post("/leave", auth(["Admin", "Manager", "Employee"]), async(req, res) => {
    try {
        const { employee_id, attendance_date } = req.body;

        const MarkLeave = await Attendance.create({
            employee_id,
            attendance_date,
            status: "On Leave",
        });

        res.status(201).json({ message: "Leave marked successfully", MarkLeave });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 📋 Get Attendance History
AttendanceRouter.get("/", auth(["Admin", "Manager", "Employee"]), async(req, res) => {
    try {
        const { employee_id } = req.query;
        const filter = employee_id ? { employee_id } : {};

        const attendanceHistory = await Attendance.find(filter).populate("employee_id");

        res.json({ message: "Attendance history fetched successfully", attendanceHistory });
    } catch (err) {
        res.status(500).json({ message: "Error fetching attendance history", error: err.message });
    }
});

module.exports = AttendanceRouter;