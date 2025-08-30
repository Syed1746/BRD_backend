const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connectDB");
require("dotenv").config();

const AuthRouter = require("./routes/authRoutes");
const EmployeeRouter = require("./routes/employeeRoutes");
const AttendanceRouter = require("./routes/attendanceRoutes");
const CustomerRouter = require("./routes/customerRoutes");
const VendorRouter = require("./routes/vendor");
const ProjectRouter = require("./routes/projects");
const TimesheetRouter = require("./routes/timesheet");
const InvoiceRouter = require("./routes/invoice");

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Setup CORS correctly
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://vwjgtz5s-5173.inc1.devtunnels.ms",
            "https://brd-frontend-two.vercel.app"
        ],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        credentials: true
    })
);

// ✅ Handle preflight requests globally
app.options("*", cors());

// ✅ Middleware
app.use(express.json());

// ✅ Routes (only relative paths here!)
app.use("/api/auth", AuthRouter);
app.use("/api/employee", EmployeeRouter);
app.use("/api/attendance", AttendanceRouter);
app.use("/api/customer", CustomerRouter);
app.use("/api/vendor", VendorRouter);
app.use("/api/projects", ProjectRouter);
app.use("/api/timesheet", TimesheetRouter);
app.use("/api/invoice", InvoiceRouter);

// ✅ Connect to DB and start server
connectDB();

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});