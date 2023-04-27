const mongoose = require("mongoose");
const dbUrl = "mongodb://127.0.0.1:27017/test";

mongoose.connect(
  dbUrl,
  {
    autoCreate: true,
    autoIndex: true,
  },
  (err) => {
    if (err) {
      console.error("Mongo connection errro: " + err);
    } else {
      console.log("Db Connected successfully.");
    }
  }
);
