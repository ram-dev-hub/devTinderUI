
const validate=require('validator');

const validateUser=(req,res,next)=>{
    const {firstName,lastName,email,password}=req.body;
    if(!firstName || !lastName || !email || !password)
    {
        return res.status(400).send('Please fill all the fields');
    }
    if(!validate.isEmail(email))
    {
        return res.status(400).send('Invalid email id');
    }
    if(password.length<6)
    {
        return res.status(400).send('Password length should be greater than 6');
    }
return true;}

const validateProfileUpdate=(req,res,next)=>{

    const ALLOWED_FIELDS=['firstName','lastName','aboutUs','imageUrl','password','email','skills','age','gender'];
const reqkeys=Object.keys(req.body);
const isValid=reqkeys.every((key)=>ALLOWED_FIELDS.includes(key));
if(!isValid)
{
    throw new Error ('Invalid fields');
}
return true;
}

module.exports={
    validateUser,
    validateProfileUpdate
}
 