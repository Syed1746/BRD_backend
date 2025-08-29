const express = require("express");
const TimesheetRouter = express.Router();
const Timesheet = require("../models/Timesheet");
const auth = require("../middleware/auth");

// ➕ Add Timesheet
TimesheetRouter.post("/", auth(["Admin", "Manager", "Employee"]), async(req, res) => {
    try {
        const timesheet = new Timesheet(req.body);
        await timesheet.save();
        res.status(201).json({ message: "Timesheet added successfully", timesheet });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// ✏️ Update Timesheet
TimesheetRouter.put("/:id", auth(["Admin", "Manager"]), async(req, res) => {
    try {
        const timesheet = await Timesheet.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!timesheet) return res.status(404).json({ message: "Timesheet not found" });
        res.json({ message: "Timesheet updated successfully", timesheet });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 📄 View Timesheets (all or by employee)
TimesheetRouter.get("/", auth(["Admin", "Manager", "Employee"]), async(req, res) => {
    try {
        const { employee_id } = req.query;
        let filter = {};
        if (employee_id) filter.employee_id = employee_id;

        const timesheets = await Timesheet.find(filter).populate("employee_id project_id");
        res.json({ timesheets });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = TimesheetRouter;