const mongoose = require('mongoose');
const colors = require('colors');
require('dotenv').config();

const connectDatabase = async () => {
  try {
    mongoose.set('strictQuery', true);
    const connection = await mongoose.connect(process.env.DB_URI);
    console.log(
      `MongoDB Connected: ${connection.connection.host}`.cyan.underline
    );
  } catch (error) {
    console.log(error)
    console.log('Unable to connect to database'.brightRed);
    process.exit(1);
  }
};

module.exports = connectDatabase;