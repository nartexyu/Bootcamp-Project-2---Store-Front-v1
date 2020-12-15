const db = require("../models");
const passport = require("../config/passport");
const { uploader, cloudinaryConfig } = require("../config/middleware/cloudinaryConfig");
const { multerUploads, getContent } = require("../config/middleware/multer");

module.exports = function(app) {

    app.post("/api/login", passport.authenticate("local"), (req, res) => {
      res.json(req.user);
    });

    app.post("/api/signup", (req, res) => {
      db.User.create({
        email: req.body.email,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name
      })
        .then(function() {
          res.redirect(307, "/api/login");
        })
        .catch(function(err) {
          console.log(err);
        });
    });

    app.post("/api/store", (req, res) => {
      db.Store.create({
        store_name: req.body.store_name,
        owner_first_name: req.body.first_name,
        owner_last_name: req.body.last_name,
        address: req.body.address,
        email: req.body.email,
        font: req.body.font,
        background_image: req.body.background_image,
        about: req.body.about,
        about_image: req.body.about_image,
        accent_color: req.body.accent_color
      });
    });

    app.use("*", cloudinaryConfig);

    app.post("/upload", multerUploads, async (req, res) => {
      console.log("req.file :", req.file);
      if (req.file) {
        const file = await getContent(req);
        console.log(file);
        return uploader.upload(file.content).then(result => {
          const image = result.url;
          console.log(image);
          return res.status(200).json({
            message: "Your image has been uploaded successfully",
            data: {
              image
            }
          })
        }).catch(err => res.status(400).json({
          message: "Something went wrong while processing your request",
          data: {
            err
          }
        }));
      };
    });
    // API Routes go here
}