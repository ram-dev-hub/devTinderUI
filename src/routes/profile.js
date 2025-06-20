const express=require('express');

const { User } = require('../models/User');
const {authentication}=require('../middleware/auth');
const {validateProfileUpdate}=require('../utils/validation')

const profileRoutes=express.Router();

profileRoutes.get("/user",authentication,async(req,res)=>{
    
    try{
    const data= await User.find({email:req.body.email});  
     res.send(data);
    }
    catch(e)
    {        res.status(500).send(e);  
    }        
 })
 
 profileRoutes.get("/profile/view",authentication,async(req,res)=>{    
     try{
      res.send(req.UserData);
     }
     catch(e)
     {         res.status(500).send(e);  
     }    
     
  })

  
  profileRoutes.patch("/profile/update",authentication,async(req,res)=>{    
    try{
        if(validateProfileUpdate(req))
        {
            console.log(req.body);

        const loginedUser= req.UserData;
        const keys=Object.keys(req.body);

        keys.forEach((key)=>loginedUser[key]=req.body[key]);    
        await loginedUser.save();
        res.send(`${loginedUser.firstName} Your data updated successfully`); 
        }
    }
    catch(e)
    {
        res.status(500).send('ERROR : '+e.message);  
    }    
    
 })

 profileRoutes.patch("/profile/resetPassword",authentication,async(req,res)=>{
    try{

        const user=req.UserData;
        const {oldPassword,newPassword}=req.body;
        const isValidate=await user.VarifyPassword(oldPassword);
        if(isValidate)
        {
            user.password=newPassword;
            await user.save();
            res.send('Password reset successfully');
        }
        else{
            res.send('Old password is wrong');
        }
    }
    catch(e){
        res
        .status(500).send('ERROR : '+e.message);
    }
 })

 profileRoutes.delete("/deleteUser",authentication,async(req,res)=>{
    
    try{
     await User.findByIdAndDelete({_id:req.body.userId});  
     res.send('Delete successfully');
    }
    catch(e)
    {
        res.status(500).send(e);  
    }    
    
 })

 module.exports=profileRoutes;


 
