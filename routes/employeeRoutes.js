const express = require("express");
const EmployeeRouter = express.Router();
const Employee = require("../models/Employee");
const auth = require("../middleware/auth");

// ➕ Create Employee
EmployeeRouter.post("/", auth(["Admin", "Manager"]), async(req, res) => {
    try {
        const AddEmployee = new Employee(req.body);
        await AddEmployee.save();
        res.status(201).json(AddEmployee);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 📋 Get All Employees
EmployeeRouter.get("/", auth(["Admin", "Manager"]), async(req, res) => {
    try {
        const GetEmployee = await Employee.find();
        res.status(200).json(GetEmployee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    s
});

module.exports = EmployeeRouter;