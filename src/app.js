const express=require('express');
const {authentication}=require("./middleware/auth")
const {connectdataBase}=require('./database');
const { User } = require('./data/Userschema');
const app=express();

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
app.listen(4200,()=>
    {
        console.log('server reunning port 4200')
    }
    );


app.post("/signup",authentication,async(req,res)=>{
    console.log('test')
    const _user={
        firstName:'Ramalingam',
        lastName:'Kunjan',
        age:35,
        password:'Jayakodi',
        email:'ramatest@gmail.com'
    }

    const userData=new User(_user);
    await userData.save();
    res.send("make get call");
})

// app.use("/",(req,res)=>{
//     res.send('server responding ')
//     })
// app.use("/test",(req,res)=>{
// res.send('test responding ')
// })

// app.use("/",(err,req,res,next)=>{
//     if(err)
//     res.status(500).send('Hello responding ')
//     })