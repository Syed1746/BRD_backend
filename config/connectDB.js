const mongoose = require("mongoose");

const connectDB = async() => {
    await mongoose.connect("mongodb+srv://root:pejAKuqSDZTKFXbh@cluster0.a2nc4w2.mongodb.net/BRD")
        .then(console.log("mongodb COnneectedd..."))
        .catch((e) => console.log(e))
}
module.exports = connectDB;