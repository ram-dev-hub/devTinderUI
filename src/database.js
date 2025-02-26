const mangooseDB=require('mongoose');


const connectDB=async ()=>{
await mangooseDB.connect('mongodb+srv://ramalingamitprofessional:DYDGuh3UlIMFWjSv@mylearn.gnc2j.mongodb.net/DevTinder');
}

module.exports={
    connectdataBase:connectDB
}


