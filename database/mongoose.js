const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose
  .connect(
    "mongodb+srv://dextersandeep:Tasklist098@cluster0.mntsbpd.mongodb.net/TaskList?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB connected successfully!");
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = mongoose;
