const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,

        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["Admin", "Manager", "Employee"],
        default: "Employee"
    },
    status: {
        type: String,
        enum: ["Active", "Disabled"],
        default: "Active"
    }
})

const User = mongoose.model("User", UserSchema);
module.exports = User;