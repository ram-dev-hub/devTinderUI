
const mangooseDB=require('mongoose')
const validate=require('validator')
const bcrypt=require('bcrypt');
const jwt =require('jsonwebtoken');
const UserSchema=mangooseDB.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
    },
    aboutUs:{
        type:String
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
    imageUrl:{
        type:String
    },
    
},{
    timestamps:true
})

UserSchema.methods.VarifyPassword=async function(passwordbyInput){
 return await bcrypt.compare(passwordbyInput,this.password);
   
}

UserSchema.methods.generateToken=async function (){
    return await jwt.sign({_id:this._id},'devTinder@1626',{expiresIn:'1d'});

}

module.exports={
    User:mangooseDB.model('User',UserSchema)
}