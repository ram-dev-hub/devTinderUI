const express=require('express');
const {authentication}=require("./middleware/auth")
const {connectdataBase}=require('./database');
const { User } = require('./models/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app=express();

app.use(express.json());
app.use(cookieParser());
// app.use(express.urlencoded({extended:true}));
// app.use(express.static('public'));
// app.use(express.static('images'));
// app.use(express.static('css'));
// app.use(express.static('js'));
// app.use(express.static('node_modules'));

connectdataBase().then(()=>{
    console.log('connected successfully')
    app.listen(7200,()=>
        {
            console.log('server reunning  7200')
        }
        );

}).catch(()=>{
    console.log('connection failed')

})
// app.listen(4200,()=>
//     {
//         console.log('server reunning port 4200')
//     }
//     );


app.post("/signup",authentication,async(req,res)=>{
    const _user=req.body;
    const userData=new User(req.body);
    console.log(userData);
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



app.post("/login",authentication,async(req,res)=>{
    try{
    const userData=new User(req.body);
    console.log(userData);

const user=await User.findOne({email:req.body.email});
console.log(user);
if(!user)
{    
     res.send('Email id is missing');
}
const isValidate= await bcrypt.compare(req.body.password,user.password);
console.log(isValidate);
if(isValidate)
{
const token=await jwt.sign({_id:user._id},'devTinder@1626')

console.log(token);
res.cookie('jwt',token);
 res.send('login successfully');

}  
}
   catch(e)
   {
    console.log(e);
       res.status(500).send(e);  
   }    
   
})

app.get("/user",authentication,async(req,res)=>{
    
   try{
   const data= await User.find({email:req.body.email});  
    res.send(data);
   }
   catch(e)
   {
       res.status(500).send(e);  
   }    
   
})

app.get("/profile",authentication,async(req,res)=>{
    
    try{
    
      const isValidate=  await jwt.verify(req.cookies.jwt,'devTinder@1626')
        console.log(isValidate);
        const data=await User.findOne({_id:isValidate._id});

     res.send(data);
    }
    catch(e)
    {
        res.status(500).send(e);  
    }    
    
 })



app.get("/userAll",authentication,async(req,res)=>{
    
    try{
    const data= await User.find({});  
     res.send(data);
    }
    catch(e)
    {
        res.status(500).send(e);  
    }    
    
 })
 app.patch("/updateUser",authentication,async(req,res)=>{    
    try{

        const ALLOWED_FIELDS=['firstName','lastName','email']
        const keys=Object.keys(req.body);
        const isValid=keys.every((key)=>ALLOWED_FIELDS.includes(key));
        if(!isValid)
        {
            return res.status(400).send('Invalid fields');
        }

    const data= await User.findByIdAndUpdate({_id:req.body.userId},req.body,{returnDocument:'after'});  
     res.send(data);
    }
    catch(e)
    {
        res.status(500).send(e);  
    }    
    
 })

 app.delete("/deleteUser",authentication,async(req,res)=>{
    
    try{
     await User.findByIdAndDelete({_id:req.body.userId});  
     res.send('Delete successfully');
    }
    catch(e)
    {
        res.status(500).send(e);  
    }    
    
 })
// app.use("/",(req,res)=>{
//     res.send('server responding ')
//     })
// app.use("/test",(req,res)=>{
// res.send('test responding ')
// })

app.use("/user",(req,res,next)=>{
   
    //res.send('Hello responding ')
    next();
    },
    (req,res,next)=>{
        res.send('Hello responding 1 ')
    }

)