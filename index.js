const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// Middleware
// app.use(cors());
app.use(cors({
    origin: [
        "https://brd-frontend-two.vercel.app", // deployed frontend
        "http://localhost:5173", // local React frontend
        "http://localhost:4173/" //local production frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
        // credentials: true,
}));

app.use(express.json());

// Routers
const AuthRouter = require("./routes/authRoutes");
const EmployeeRouter = require("./routes/employeeRoutes");
const AttendanceRouter = require("./routes/attendanceRoutes");
const TimesheetRouter = require("./routes/timesheet");
const ProjectRouter = require("./routes/projects");
const VendorRouter = require("./routes/vendor");
const CustomerRouter = require("./routes/customerRoutes");
const InvoiceRouter = require("./routes/invoice");

// ✅ IMPORTANT: only use relative paths here
app.use("/api/auth", AuthRouter);
app.use("/api/employees", EmployeeRouter);
app.use("/api/attendance", AttendanceRouter);
app.use("/api/timesheets", TimesheetRouter);
app.use("/api/projects", ProjectRouter);
app.use("/api/vendors", VendorRouter);
app.use("/api/customers", CustomerRouter);
app.use("/api/invoices", InvoiceRouter);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});