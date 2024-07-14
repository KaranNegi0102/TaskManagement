const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://anuraggo3l07:Pagaldeven23@trialproject.cbh5son.mongodb.net/ToDo_List_Tasks"
);

mongoose.connection.on("connected", () => {
  console.log("DB COnnected");
});

mongoose.connection.on("error", (err) => {
  console.log("Error in connecting DB", err);
});

module.exports = mongoose;
