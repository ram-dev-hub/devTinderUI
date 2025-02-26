const express=require('express');
const {authentication}=require("./middleware/auth")
const {connectdataBase}=require('./database');
const { User } = require('./models/User');
const app=express();

app.use(express.json());
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
    console.log(req);
    const userData=new User(req.body);
   try{
    await userData.save();
   res.send("make get call");
   }
   catch(e)
   {
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