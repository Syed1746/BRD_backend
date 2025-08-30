const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connectDB");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ apply cors first
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://vwjgtz5s-5173.inc1.devtunnels.ms",
        "https://brd-frontend-two.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}));

// ✅ handle preflight requests globally
app.options("*", cors());

app.use(express.json());

// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/employee", require("./routes/employeeRoutes"));
app.use("/api/attendance", require("./routes/attendanceRoutes"));
app.use("/api/customer", require("./routes/customerRoutes"));
app.use("/api/vendor", require("./routes/vendor"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/timesheet", require("./routes/timesheet"));
app.use("/api/invoice", require("./routes/invoice"));

connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});