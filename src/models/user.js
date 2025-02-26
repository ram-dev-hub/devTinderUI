
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
    password:{
        type:String        
    },
    age:{
        type:Number
    },
    gender:{
        type:String
    },
    password:{
        type:String
    },
})

module.exports={
    User:mangooseDB.model('User',UserSchema)
}