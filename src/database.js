const mangooseDB=require('mongoose');


const connectDB=async ()=>{
await mangooseDB.connect('mongodb+srv://ramalingamitprofessional:DYDGuh3UlIMFWjSv@mylearn.gnc2j.mongodb.net/?retryWrites=true&w=majority&appName=myLearn');
}

module.exports={
    connectdataBase:connectDB
}


