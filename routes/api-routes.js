const db = require("../models");
const passport = require("../config/passport");
const { resolve } = require("path");
const { uploader, cloudinaryConfig } = require("../config/middleware/cloudinaryConfig");
const { multerUploads, dataUri } = require("../config/middleware/multer");

module.exports = function(app) {
    app.post("/api/login", passport.authenticate("local"), function(req, res) {
        res.json(req.user);
    });

    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "../test.html"));
    });

    app.use("*", cloudinaryConfig);

    app.post("/upload", multerUploads, (req, res) => {
      if (req.file) {
        const file = dataUri(req).content;
        return uploader.upload(file).then(result => {
          const image = result.url;
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

    app.post("/api/uploadimage", (req, res) => {
      const data = {
        image: req.body.image,
      };
      uploader.upload(data.image).then(result => {
        res.status(200).send({
          message: "success",
          result
        });
        console.log(result.url);
      }).catch(error => {
        res.status(500).send({
          message: "failure",
          error
        });
      });
    });
    // API Routes go here
}