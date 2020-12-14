const db = require("../models");
const passport = require("../config/passport");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.cloudname,
  api_key: process.env.apikey,
  api_secret: process.env.secret
});

module.exports = function(app) {
    app.post("/api/login", passport.authenticate("local"), function(req, res) {
        res.json(req.user);
    });

    app.get("/", (req, res) => {
      res.send("Success");
    });

    app.post("/upload-image", (req, res) => {
      const data = {
        image: req.body.image,
      };
      cloudinary.uploader.upload(data.image).then(result => {
        res.status(200).send({
          message: "success",
          result
        });
      }).catch(error => {
        res.status(500).send({
          message: "failure",
          error
        });
      });
    });
    // API Routes go here
}