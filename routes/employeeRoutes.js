const express = require("express");
const EmployeeRouter = express.Router();
const Employee = require("../models/Employee");
const auth = require("../middleware/auth");

// ➕ Create Employee (Admin/Manager only)
EmployeeRouter.post("/", auth(["Admin", "Manager"]), async(req, res) => {
    try {
        const newEmployee = new Employee(req.body);
        await newEmployee.save();
        res.status(201).json(newEmployee);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 📋 Get All Employees (Admin/Manager only)
EmployeeRouter.get("/", auth(["Admin", "Manager"]), async(req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 📋 Get single Employee by ID (Admin/Manager only)
EmployeeRouter.get("/:id", auth(["Admin", "Manager"]), async(req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ message: "Employee not found" });
        res.status(200).json(employee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✏️ Update Employee (Admin/Manager only)
EmployeeRouter.put("/:id", auth(["Admin", "Manager"]), async(req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEmployee) return res.status(404).json({ message: "Employee not found" });
        res.json({ message: "Employee updated successfully", employee: updatedEmployee });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// ❌ Deactivate Employee (mark as Inactive) (Admin/Manager only)
EmployeeRouter.put("/:id/deactivate", auth(["Admin", "Manager"]), async(req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, { active: "Inactive" }, { new: true });
        if (!employee) return res.status(404).json({ message: "Employee not found" });
        res.json({ message: "Employee deactivated successfully", employee });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = EmployeeRouter;