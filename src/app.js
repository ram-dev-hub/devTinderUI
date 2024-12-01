const express=require('express');
const app=express();
app.listen(4200,()=>
{
    console.log('server reunning port 4200')
}
);
app.use("/",(req,res)=>{
    res.send('server responding ')
    })
app.use("/test",(req,res)=>{
res.send('test responding ')
})

app.use("/hello",(req,res)=>{
    res.send('Hello responding ')
    })