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

app.post("/createInfo", async (req, res) => {
  try {
    // var {name, } = {};

    // if (req.body.name) {
    //   obj.name = req.body.name;
    // }

    // if (req.body.bio) {
    //   obj["bio"] = req.body.bio;
    // }

    // if (req.body.phoneNumber) {
    //   obj["phoneNumber"] = req.body.phoneNumber;
    // }

    // if (req.body.image) {
    //   obj["image"] = req.body.image;
    // }

    let user = await Users.findOneAndUpdate({ uid: req.body.uid }, req.body);
    if (!user) {
      console.log("detailsssssssssssssssss", req.body);
      const details = {
        name: req.body.name,
        bio: req.body.bio,
        phoneNumber: req.body.phoneNumber,
        uid: req.body.uid,
        image: req.body.image,
      };

      const newUser = new Users(details);
      await newUser.save();
      res.json({
        msg: "  user has been successfully added to our database ",
      });
    }
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

app.delete("/deleteProfile/:uid", async (req, res) => {
  try {
    let user = await Users.deleteOne({ uid: req.params.uid });
    return res.send("User Deleted", user);
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => console.log("server up and running"));
