const mongoosDB=require('mongoose');
const validate=require('validator');


const ConnectRequestSchema=mongoosDB.Schema({
    fromUserId:{
        type:mongoosDB.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    toUserId:{
        type:mongoosDB.Schema.Types.ObjectId,
        required:true ,
        ref:'User'    
    },
    status:{
        type:String,
        enum:{
            values:['ignored','interested','accepted','rejected'],
            message:'{VALUE} is not supported'
        }
    }
},
{
    timestamps:true
});

ConnectRequestSchema.index({fromUserId:1,toUserId:1},{unique:true});

ConnectRequestSchema.pre('save',async function(next){
    const Connectionrequest=this;
if(Connectionrequest.fromUserId.equals(Connectionrequest.toUserId))
{
    throw new Error('You can not send request to yourself');
  
}});

module.exports={
    ConnectionRequest:mongoosDB.model('ConnectionRequest',ConnectRequestSchema)
}