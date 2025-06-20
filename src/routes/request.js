const express=require('express');
const { User } = require('../models/User');
const {authentication}=require('../middleware/auth');
const {ConnectionRequest}=require('../models/connectionRequest');
const auth = require('../middleware/auth');


const requestRoutes=express.Router();

requestRoutes.get("/sendConnection",authentication,async(req,res)=>{    
    try{
     const {firstName}=req.userData;
     res.send(firstName + ' send connection request');
    }
    catch(e)
    {
        res.status(500).send(e);  
    }    
    
 })

requestRoutes.post("/request/send/:status/:toUserId", authentication, async (req, res) => {
    try {
        const fromUserId = req.UserData._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;
        const ALLOWED_STATUS = ['ignored', 'interested'];
        if (!ALLOWED_STATUS.includes(status)) {
            throw new Error('Invalid status');
        }

        const connectionRequestData = new ConnectionRequest({ fromUserId, toUserId, status });
        const isExsist = await ConnectionRequest.findOne({ $or:[{ fromUserId, toUserId }, { fromUserId:fromUserId , toUserId: toUserId }] });
        if (isExsist) {
            throw new Error('Connection request already send');
        }

        const data = await connectionRequestData.save();
        res.send({
            message: 'Connection request send successfully',
            data
        });
        res.send(firstName + ' send connection request');
    }
    catch (e) {
        res.status(500).send("ERROR : " + e.message);
    }

})

requestRoutes.post('/request/review/:status/:requestId', authentication, async (req, res) => {

    try {
        const { status, requestId } = req.params;
        const ALLOWED_STATUS = ['accepted', 'rejected'];
        if (!ALLOWED_STATUS.includes(status)) {
            res.status(400).send('Invalid status');
        }
        const connectionRequest = await ConnectionRequest.findOne({ _id: requestId,toUserId: req.UserData._id });
        if (!connectionRequest) {
            throw new Error('Invalid request');
        }
        connectionRequest.status = status;
      const data=  await connectionRequest.save();
       return res.send(req.userData.firstName + ' '+status + ' Request reviewed successfully',data);

    }
    catch (e) {
        return res.status(500).send("ERROR : " + e.message);
    }

});   

 
 requestRoutes.get("/userAll",authentication,async(req,res)=>{
    
    try{
    const data= await User.find({});  
     res.send(data);
    }
    catch(e)
    {
        res.status(500).send(e);  
    }    
    
 })

 module.exports=requestRoutes;

