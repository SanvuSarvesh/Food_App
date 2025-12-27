const mongoose = require('mongoose')
// MongoDB Database connection
const dbConnection = async () =>{
  try{
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log(`Connected to ${mongoose.connection.host}`)
  }catch(error){
    console.error(`Connection Error : ${error}`);
  }
};

module.exports = dbConnection;