const express = require("express");
const ProjectRouter = express.Router();
const Project = require("../models/Projects");
const auth = require("../middleware/auth");

// ➕ Add Project
ProjectRouter.post("/", auth(["Admin", "Manager"]), async(req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(201).json({ message: "Project added successfully", project });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// ✏️ Update Project
ProjectRouter.put("/:id", auth(["Admin", "Manager"]), async(req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!project) return res.status(404).json({ message: "Project not found" });
        res.json({ message: "Project updated successfully", project });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// ❌ Deactivate (mark as On Hold)
ProjectRouter.put("/:id/deactivate", auth(["Admin", "Manager"]), async(req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, { status: "On Hold" }, { new: true });
        if (!project) return res.status(404).json({ message: "Project not found" });
        res.json({ message: "Project deactivated successfully", project });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 📄 View All Projects
ProjectRouter.get("/", auth(["Admin", "Manager", "Employee"]), async(req, res) => {
    const projects = await Project.find();
    res.json({ projects });
});

module.exports = ProjectRouter;