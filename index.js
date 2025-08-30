const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/connectDB")
    // const dotenv = require.config()("dotenv");
const PORT = process.env.PORT || 3000;
const AuthRouter = require("./routes/authRoutes");
const EmployeeRouter = require("./routes/employeeRoutes");
const AttendanceRouter = require("./routes/attendanceRoutes");
const CustomerRouter = require("./routes/customerRoutes");
const VendorRouter = require("./routes/vendor");
const ProjectRouter = require("./routes/projects");
const TimesheetRouter = require("./routes/timesheet");
const InvoiceRouter = require("./routes/invoice");
require('dotenv').config();

app.use(cors({
    origin: ["http://localhost:5173", "https://vwjgtz5s-5173.inc1.devtunnels.ms"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use("/api/auth", AuthRouter);
app.use("/api/employee", EmployeeRouter)
app.use("/api/attendance", AttendanceRouter)
app.use("/api/customer", CustomerRouter)
app.use("/api/vendor", VendorRouter)
app.use("/api/projects", ProjectRouter)
app.use("/api/timesheet", TimesheetRouter)
app.use("/api/invoice", InvoiceRouter)
connectDB();
app.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`)
})