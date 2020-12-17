const db = require("../models");
const { uploader, cloudinaryConfig } = require("../config/middleware/cloudinaryConfig");
const { multerUploads, getContent } = require("../config/middleware/multer");

module.exports = function(app) {

    app.use("*", cloudinaryConfig);

    app.post("/upload/:imageType/:id", multerUploads, async (req, res) => {
      const imageType = req.params.imageType;
      if (req.file) {
        const file = await getContent(req);
        console.log(file);
        return uploader.upload(file.content).then(result => {
          const image = result.url;
          console.log(image);
          switch (imageType) {
            case "bg-image":
              bgImage(res, image, req.params.id);
              break;
            case "about-image":
              aboutImage(res, image, req.params.id);
              break;
            case "prod-image":
              prodImage(res, image, req.params.id);
              break;
            default:
              return;
          }
        }).catch(err => res.status(400).json({
          message: "Something went wrong while processing your request",
          data: {
            err
          }
        }));
      };
    });

    const bgImage = (res, image, storeid) => {
      db.Store.update({
        background_image: image
      },
      {
        where: {
          id: storeid
        }
      }).then(result => {
        return res.status(200).json({
          message: "Your image has been uploaded successfully",
          data: {
            image
          }
        });
      });
    };

    const aboutImage = (res, image, storeid) => {
      db.Store.update({
        about_image: image
      },
      {
        where: {
          id: storeid
        }
      }).then(result => {
        return res.status(200).json({
          message: "Your image has been uploaded successfully",
          data: {
            image
          }
        });
      });
    };

    const prodImage = (res, image, productid) => {
      db.Product.update({
        image: image
      },
      {
        where: {
          id: productid
        }
      }).then(result => {
        return res.status(200).json({
          message: "Your image has been uploaded successfully",
          data: {
            image
          }
        });
      });
    };
};