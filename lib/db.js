const mongoose = require("mongoose");

// const connectDB = async () => {
//   await mongoose.connect("mongodb+srv://sabashcse_db_user:YhGcrTpBirhwBRTi@cluster0.qtnyxdn.mongodb.net/");
//   console.log("MongoDB Connected");
// };

const connectDB = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/graphqlDemo");
  console.log("MongoDB Connected");
};

module.exports = connectDB;