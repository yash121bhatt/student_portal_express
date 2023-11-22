const mongoose = require('mongoose');
const liveUrl = 'mongodb+srv://yash121bhatt:yash123@cluster0.nfxdvqy.mongodb.net/admissionPortal?retryWrites=true&w=majority'
const local_url ='mongodb://127.0.0.1:27017/admissionPortal'
//  mongoose.connect('mongodb://127.0.0.1:27017/test');



const connect_db = () =>{
    //  return mongoose.connect('mongodb://127.0.0.1:27017/admissionPortal')
     return mongoose.connect(liveUrl)
    .then(()=>{
        console.log("Connected Succeessfully")
    })
    .catch((error)=>{
        console.log(error)
    })
  
}
module.exports = connect_db