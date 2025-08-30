const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routers
const AuthRouter = require("./routes/AuthRouter");
const EmployeeRouter = require("./routes/EmployeeRouter");
const AttendanceRouter = require("./routes/AttendanceRouter");
const TimesheetRouter = require("./routes/TimesheetRouter");
const ProjectRouter = require("./routes/ProjectRouter");
const VendorRouter = require("./routes/VendorRouter");
const CustomerRouter = require("./routes/CustomerRouter");
const InvoiceRouter = require("./routes/InvoiceRouter");

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
mongoose.connect(process.env.MONGO_URI, {
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