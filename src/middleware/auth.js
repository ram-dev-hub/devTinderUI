const auth=(req,res,next)=>{
next();
    // if(false)
    // {
    //  next()
    // }
    // else
    // {
    //     res.status(401).send('un Authoraised');
    // }
}
module.exports={
    authentication:auth
};