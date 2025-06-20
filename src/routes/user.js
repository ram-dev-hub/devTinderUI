const express = require('express');
const { authentication } = require('../middleware/auth');
const {ConnectionRequest}=require('../models/connectionRequest');
const { User } = require('../models/User');

const { model } = require('mongoose');
const userRoutes = express.Router();


userRoutes.get("/user/request/reviewed", authentication, async (req, res) => {
    try {
        const user = req.UserData;
        const USER_DATA = "firstName lastName ImageUrl gender age aboutUs";
        const dataList = await ConnectionRequest.find({ toUserId: user._id, status: 'interested' }). populate('fromUserId',USER_DATA);
        console.log(user._id);

        const data = dataList.map((item) => {
            return {
                _id: item._id,
                fromUserId: item.fromUserId._id,
                firstName: item.fromUserId.firstName,
                lastName: item.fromUserId.lastName,
                aboutUs: item.fromUserId.aboutUs,
                age: item.fromUserId.age,
                imageUrl: item.fromUserId.ImageUrl}});
        res.send({ message: 'Fetch data successfully', data });
    }
    catch (e) {
        res.status(500).send(e);
    }
})

userRoutes.get("/user/connections", authentication, async (req, res) => {
    try {
        const user = req.UserData;
        const USER_DATA = "firstName lastName ImageUrl gender age aboutUs";

        const connections = await ConnectionRequest
            .find({
                $or: [
                    { fromUserId: user._id, status: "accepted" },
                    { toUserId: user._id, status: "accepted" },
                ],
            })
            .populate("fromUserId", USER_DATA)
            .populate("toUserId", USER_DATA);

        console.log('data' + connections);
        const result = connections.map((item) => {
            return item.fromUserId._id === user._id ? { ...item.toUserId._doc } : { ...item.fromUserId._doc }
        });
        res.send({ message: 'Fetch data successfully', data: result });

    }
    catch (e) {
        res.status(400).send(e.message);
    }
})

userRoutes.get("/user/feeds",authentication,async(req,res)=>{
    try{
 const page=Number(req.query.page) || 1;
 const limit=Number(req.query.limit) || 10;
    const skip=(page-1)*limit;

        const user=req.UserData;
        const USER_DATA="firstName lastName imageUrl";
        const connectionsuser=await ConnectionRequest.find({$or:[{fromUserId:user._id},{toUserId:user._id}]})
        var hideusers=new Set();
        connectionsuser.forEach((item)=>{
            if(item.fromUserId._id.toString()===user._id.toString())
            {
                hideusers.add(item.toUserId._id);
            }
            else{
                hideusers.add(item.fromUserId._id);
            }
        });
         const feedUsers=await User.find({$and:[{_id:{$nin:[...hideusers]} },{_id:{$ne:user._id}}]})
         .populate(USER_DATA).skip(skip).limit(limit);
        
        console.log(feedUsers);
        res.send({message:'Fetch data successfully',feedUsers});
    }
    catch(e)
    {
        res.status(400).send(e.message);
    }
})

module.exports = userRoutes
