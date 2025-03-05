
const mangooseDB=require('mongoose')
const validate=require('validator')
const UserSchema=mangooseDB.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
        validate(value){
            if(!validate.isEmail(value))
            {
                throw new Error('Email is invalid')
            }
        }  
    },   
    age:{
        type:Number,
        min:16,
    },
    gender:{
        type:String,
        enum:{
            values:['Male','Female','Others'],
            message:'{VALUE} is not supported'
        }
    },
    password:{
        type:String,
        minlength:8,
        
    },
    skills:{
        type:Array
    },
    
},{
    timestampz:true
})

module.exports={
    User:mangooseDB.model('User',UserSchema)
}