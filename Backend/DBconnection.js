const mongoose = require('mongoose');
require('dotenv').config();

const connectlogindb = async () => { 
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("login DB connected");
    } catch (err) {
        console.error("Error occurred while connecting to login DB", err);
        process.exit(1);
    }
};

module.exports = connectlogindb;
