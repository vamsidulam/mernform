const mongoose=require('mongoose');

const connectlogindb=async()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/studentdb');
        console.log("login DB connected");
    }
    catch(err){
        console.log("Error occured in conection loginform DB");
        process.exit(1);
    }
}

module.exports=connectlogindb;