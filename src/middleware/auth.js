const jwt=require('jsonwebtoken');
const {User} =require('../models/User');

const auth = async (req, res, next) => {
    try {
        if(req.cookies.jwt === undefined||!req.cookies.jwt) {
           return res.status(401).send('User not authenticate');
        }
        const isValidate = jwt.verify(req.cookies.jwt, 'devTinder@1626');
        if (isValidate) {
            const { _id } = isValidate;
            const user = await User.findById(_id);

            if (user) {
                req.UserData = user;
                next();
            }
            else {
                throw new Error('User not found');
                // res.status(400).send('User not found');
            }
        }
        else {
            throw new Error('User not validate');

            // res.status(400).send('User not validate found');

        }

    }
    catch (e) {
        res.status(400).send('ERROR : ' + e.message);
    }

}
module.exports={
    authentication:auth
};