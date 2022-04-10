const mongoose = require("mongoose");

const connectDB = async () => {

    const db = "mongodb+srv://saurabh01:solution28@cluster0.4rrtc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })

        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }




}

module.exports = connectDB;