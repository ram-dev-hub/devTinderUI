# devTinder
    - This page look like tinder app
    - Should use react ts
    - create interface file for all params
    - use redux for state management 
    - create jest test case for all tsx and ts file
    - mock properly
    - page designe using tailwind css
    - it should be resposive for all device
# DB params
    - user
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
    - ConnectRequest
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

    


