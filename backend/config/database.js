const mongoose = require('mongoose');
const colors = require('colors');

const connectDatabase = async () => {
  try {
    mongoose.set('strictQuery', true);
    const connection = await mongoose.connect("mongodb+srv://gyaneshwer0001:gyaneshwer0001@cluster0.zpbmyjw.mongodb.net/campusdb?retryWrites=true&w=majority&appName=Cluster0");
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