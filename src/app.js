const express=require('express');
const {authentication}=require("./middleware/auth")
const {connectdataBase}=require('./database');

const authROutes=require('./routes/auth');
const profileRoutes=require('./routes/profile');    
const requestRoutes=require('./routes/request');
const userRoutes = require('./routes/user');
const cookieParser = require('cookie-parser');
const cors=require('cors');
const app=express();

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
    methods:['GET','POST','PATCH','PUT','DELETE']}));
app.use(express.json());
app.use(cookieParser());

app.use(authROutes);
app.use(profileRoutes);
app.use(requestRoutes);
app.use(userRoutes);
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






 



