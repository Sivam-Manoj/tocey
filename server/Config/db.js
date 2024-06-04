const mongoose = require("mongoose");

const ConnectMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("database connected succesfully");
  } catch (error) {
    console.log("internal server error", error);
  }
};

module.exports = {
  ConnectMongoDb,
};
