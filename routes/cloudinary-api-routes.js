const db = require("../models");
const { uploader, cloudinaryConfig } = require("../config/middleware/cloudinaryConfig");
const { multerUploads, getContent } = require("../config/middleware/multer");

module.exports = function(app) {

    app.use("*", cloudinaryConfig);

    app.post("/upload/:imageType", multerUploads, async (req, res) => {
      const imageType = req.params.imageType;
      if (req.file) {
        const file = await getContent(req);
        console.log(file);
        return uploader.upload(file.content).then(result => {
          const image = result.url;
          console.log(image);
          db.Product.update({
            image: image
          },
          {
            where: {
              id: 1
            }
          }).then(dbProduct => {
            return res.status(200).json({
              message: "Your image has been uploaded successfully",
              data: {
                image
              }
            });
          });
        }).catch(err => res.status(400).json({
          message: "Something went wrong while processing your request",
          data: {
            err
          }
        }));
      };
    });
};