const express = require("express");
const EmployeeRouter = express.Router();
const Employee = require("../models/Employee");
const auth = require("../middleware/auth");

EmployeeRouter.post("/", auth(["Admin", "Manager"]), async function(req, res) {
    try {
        const AddEmployee = new Employee(req.body);
        await AddEmployee.save();
        res.status(201).json({
            AddEmployee
        })
    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }
})

EmployeeRouter.get("/", auth(["Admin", "Manager"]), async function(req, res) {
    const GetEmployee = await Employee.find();
    res.status(200).json({
        GetEmployee
    })
})

module.exports = EmployeeRouter;