const express=require('express');
const { User } = require('../models/User');
const bcrypt=require('bcrypt');
const {authentication}=require('../middleware/auth');

const authRoutes=express.Router();

authRoutes.post("/signup",async(req,res)=>{
    const userData=new User(req.body);
    userData.password= await bcrypt.hash(req.body.password,10);
   try{
    await userData.save();
   res.send("Save user successfully");
   }
   catch(e)
   {
       res.status(500).send(e);  
   }    
   
})

authRoutes.post("/login", async (req, res) => {
    try {
   
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
          throw new Error('Email id is missing');
        }
        const isValidate = user.VarifyPassword(req.body.password);
        if (isValidate) {
            const token = await user.generateToken();

            res.cookie('jwt', token);
            res.send(user);
        }
    }
    catch (e) {
        res.status(400).send("ERROR : "+e.message);
    }

})
authRoutes.post("/logout",authentication,async(req,res)=>{
    res.clearCookie('jwt');        
    res.send('logout successfully');
})

module.exports=authRoutes;

