const db = require("../models");

module.exports = app => {

    // Get route for all stores and their products
    app.get("/landing", (req, res) => {
        db.Store.findAll({
          include: [db.Product],
          order: [
              [db.Product, "popularity", "DESC"]
          ]
        }).then(result => {
          let data = [];
          result.forEach(store => {
            let info = {
              store: store.store_name,
              image: store.Products[0].image 
            };
            data.push(info);
          });
          res.render("landing", {data: data});
        });
      });
  
    // Get route for specific store by ID
    app.get("/api/store/:id", (req, res) => {
        db.Store.findOne({
          where: {
            id: req.params.id
          },
          include: [db.Product],
          order: [
              [db.Product, "popularity", "DESC"]
          ]
        }).then(result => {
          res.render("storefront", {
            font: result.font,
            background_image: result.background_image,
            store_name: result.store_name,
            productImage1: result.Products[0].image,
            productName1: result.Products[0].name,
            productImage2: result.Products[1].image,
            productName2: result.Products[1].name,
            productImage3: result.Products[2].image,
            productName3: result.Products[2].name,
            about: result.about,
            about_image: result.about_image,
            address: result.address,
            font_color: result.font_color,
            body_color: result.body_color,
            accent_color: result.accent_color
          });
        });
    });

    app.get("/contact/:id", (req, res) => {
      db.Store.findOne({
        where: {
          id: req.params.id
        }
      }).then(result => {
        res.render("contact", {
          name: result.store_name,
          address: result.address,
          font: result.font,
          font_color: result.font_color,
          body_color: result.body_color,
          accent_color: result.accent_color
        });
      });
    });

    app.post("/api/store", (req, res) => {
        db.Store.create({
          store_name: req.body.store_name,
          address: req.body.address,
          about: req.body.about,
          UserId: req.body.UserId
        }).then(result => {
          res.json(result);
        });
    });
};