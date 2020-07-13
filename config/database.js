const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config()

const connectDb = async ()=>{
  try {
    const conn = await mongoose.connect(process.env.DB_CONNECT,{
      useNewUrlParser:true,
      useUnifiedTopology:true
    })
    console.log(`MongoDb connected: ${conn.connection.host}`);

  } catch (err) {
    console.log(err);
    process.exit(1)
  }
}

module.exports = connectDb
