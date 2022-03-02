const mongoose = require("mongoose");

const connectToDatabase = () => {
  mongoose
    .connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Mongodb is connected with server: ${data.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
    });
};


module.exports = connectToDatabase;