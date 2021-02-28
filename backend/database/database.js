const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://danfous:danfous321@cluster0.qr5yu.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongodb is connected");
  });

mongoose.set("useFindAndModify", false);

var db = mongoose.connection;

db.once("open", () => {
  console.log("MongoDB is Open");
});

db.on("error", () => {
  console.log("there is an error in MongoDB");
});

let User = mongoose.Schema({
  name: String,
  bio: String,
  phoneNumber: Number,
  uid: String,
});

// let Users = mongoose.model("user", User);

module.exports = mongoose.model("user", User);
