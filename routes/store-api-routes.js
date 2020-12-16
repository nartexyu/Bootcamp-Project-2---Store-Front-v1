const db = require("../models");

module.exports = app => {

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
          res.render("storefront", {
            store_name: result.store_name,
            productImage: result.Products[0].image,
            productName: result.Products[0].name,
            about: result.about,
            address: result.address
          });
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
};