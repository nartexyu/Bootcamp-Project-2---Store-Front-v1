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
};