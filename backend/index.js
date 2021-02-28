const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const cors = require("cors");
const Users = require("./database/database");

const port = 8000;

app.use(express.static(path.join(__dirname, "../client/public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// app.post("/createInfo", (req, res) => {
//   console.log("detailsssssssssssssssss", req.body);
//   const details = {
//     name: req.body.name,
//     bio: req.body.bio,
//     phoneNumber: req.body.phoneNumber,
//     uid: req.body.uid,
//   };

//   const newUser = async () => {
//     new Users(details);
//     newUser.save();
//     await res.json({
//       msg: "  user has been successfully added to our database ",
//     });
//   };
// });

app.post("/createInfo", async (req, res) => {
  try {
    console.log("detailsssssssssssssssss", req.body);
    const details = {
      name: req.body.name,
      bio: req.body.bio,
      phoneNumber: req.body.phoneNumber,
      uid: req.body.uid,
    };

    const newUser = new Users(details);
    await newUser.save();
    res.json({
      msg: "  user has been successfully added to our database ",
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/user/:uid", async (req, res) => {
  try {
    let user = await Users.findOne({ uid: req.params.uid });
    return res.send(user);
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => console.log("server up and running"));
