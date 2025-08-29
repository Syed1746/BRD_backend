const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    project_code: {
        type: String,
        unique: true,
        required: true
    },
    project_name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date
    },
    status: {
        type: String,
        enum: ["Planned", "In Progress", "Completed", "On Hold"],
        default: "Planned"
    }
}, { timestamps: true });

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;