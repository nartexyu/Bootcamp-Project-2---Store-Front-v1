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
        address: req.body.address,
        font: req.body.font,
        background_image: req.body.background_image,
        about: req.body.about,
        about_image: req.body.about_image,
        accent_color: req.body.accent_color,
        UserId: req.body.UserId
      }).then(result => {
        res.json(result);
      });
    });

    app.post("/api/product", (req, res) => {
      db.Product.create({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        stock: req.body.stock,
        image: req.body.image,
        StoreId: req.body.StoreId
      }).then(result => {
        res.json(result);
      });
    });

    // Get route for all stores and their products
    app.get("/api/store", (req, res) => {
      db.Store.findAll({
        include: [db.Product]
      }).then(result => {
        res.json(result);
      });
    });

    // Get route for specific store by ID
    app.get("/api/store/:id", (req, res) => {
      db.Store.findOne({
        where: {
          id: req.params.id
        },
        include: [db.Product]
      }).then(result => {
        res.json(result);
      });
    });

    // Get route for all products and their parent store
    app.get("/api/product", (req, res) => {
      db.Product.findAll({
        include: [db.Store]
      }).then(result => {
        res.json(result);
      });
    });

    app.get("/api/product/:id", (req, res) => {
      db.Product.findOne({
        where: {
          id: req.params.id
        },
        include: [db.Store]
      }).then(result => {
        res.json(result);
      });
    });

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
    // API Routes go here
}