const express=require('express');
const app=express();
const cors=require('cors');
const loginschema=require('./models/FormSchema');
const connectdb=require('./DBconnection');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
require('dotenv').config();
const PORT = process.env.PORT || 4000;

connectdb();
app.use(cors());
app.use(express.json());

app.post('/register',async (req,res)=>{
    const {name,email,password}=req.body;
    try{
        const userdata=await loginschema.findOne({email:email});
        if(userdata){
            res.json({msg:`user already exists with this email ${email}`});
            return;
        }
        else{
            const user=new loginschema(req.body);
            await user.save();
            res.json({msg:'registerd succesffully'});
        }
        
    }
    catch{
        res.status(404).json({msg:'page not found'});
    }
})

app.post('/login',async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        const userdata=await loginschema.findOne({email:email});
        if(userdata){
            const found = await bcrypt.compare(password, userdata.password);
            if(found){
                const token=jwt.sign(
                    {
                        id:userdata._id,
                        name:userdata.name,
                        email:userdata.email
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn:'1min'
                    }

                );
                res.json({msg:'logged in successfully',token:token});
            }
            else{
                res.json({msg:"password incorrect"});
            }
        }
        else{
            res.json({msg:"no user found go and register"});
            return;
        }
    }
    catch{
        res.status(404).json({msg:'page not found'});
    }
});

const middleware=(req,res,next)=>{
    const authheader=req.headers.authorization;
    if(!authheader)
        return res.status(403).json({msg:"token missing"});
    
    const token=authheader.split(' ')[1];
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
        
    }
    catch(err){
        res.status(401).json({msg:"invalid or expired token"});
    }
};

app.get('/getdetails',middleware,(req,res)=>{
    res.json({msg:`welcome ${req.user.name} with email: ${req.user.email}`});
})


app.listen(PORT,(err)=>{
    if(err){
        console.log("error in running the server 4000");
        return;
    }
    console.log("server is running on port 4000");
})
