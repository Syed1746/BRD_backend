const mongoose = require("mongoose");

const connectDB = async() => {
    await mongoose.connect(process.env.MONGO_URL)
        .then(console.log("mongodb COnneectedd..."))
        .catch((e) => console.log(e))
}
module.exports = connectDB;