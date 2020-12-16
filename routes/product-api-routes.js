const db = require("../models");

module.exports = app => {

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

  // Get route for all products and their parent store
  app.get("/api/storeproducts/:storeId", (req, res) => {
      db.Product.findAll({
          where: {
            StoreId: req.params.storeId
          },
          order: [
              ["popularity", 'DESC']
          ],
          include: [db.Store]
      }).then(result => {
        let data = {
          store: result[0].Store.store_name,
          address: result[0].Store.address,
          font: result[0].Store.font,
          font_color: result[0].Store.font_color,
          body_color: result[0].Store.body_color,
          accent_color: result[0].Store.accent_color
        };
        let products = [];
        result.forEach(product => {
          let item = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image
          };
          products.push(item);
        });
        data.products = products;
        res.render("shop", data);
      });
  });

  app.get("/api/product/:id", (req, res) => {
    db.Product.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Store]
    }).then(result => {
      res.render("product", {
        store: result.Store.store_name,
        image: result.image,
        name: result.name,
        price: result.price,
        description: result.description,
        address: result.Store.address,
        font: result.Store.font,
        font_color: result.Store.font_color,
        body_color: result.Store.body_color,
        accent: result.Store.accent_color
      })
    });
  });
};