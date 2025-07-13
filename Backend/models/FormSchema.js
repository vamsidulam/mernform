const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const loginschema=mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        }
    },
    {
        collection:'formlogindetails',
        versionKey:false
    }
)

loginschema.pre('save',async function(next){
    if(this.isModified('password')){
        console.log("password is being hashed");
        this.password=await bcrypt.hash(this.password,10);
    }
})

module.exports=mongoose.model('formlogindetails',loginschema);