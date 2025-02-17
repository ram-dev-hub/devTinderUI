
const mangooseDB=require('mongoose')
const UserSchema=mangooseDB.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    age:{
        type:Number
    },
    password:{
        type:String
    },
})
const userModel=mangooseDB.model('userModel',UserSchema)
module.exports={
    User:userModel
}