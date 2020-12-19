const db = require("../models");

module.exports = app => {

  // Get route for all products and their parent store
  app.get("/storeproducts/:userid/:storeId", (req, res) => {
      db.User.findOne({
        where: {
          id: req.params.userid
        }
      }).then(dbUser => {
        let isSeller = dbUser.isSeller;
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
            isSeller: isSeller,
            userid: req.params.userid,
            storeId: result[0].StoreId,
            store: result[0].Store.store_name,
            address: result[0].Store.address,
            font: result[0].Store.font,
            font_color: result[0].Store.font_color,
            body_color: result[0].Store.body_color,
            footer_color: result[0].Store.footer_color,
            accent_color: result[0].Store.accent_color
          };
          let products = [];
          result.forEach(product => {
            let item = {
              userid: req.params.userid,
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
  });

  app.get("/product/:userid/:id", (req, res) => {
    db.User.findOne({
      where: {
        id: req.params.userid
      }
    }).then(dbUser => {
      let isSeller = dbUser.isSeller;
      db.Product.findOne({
        where: {
          id: req.params.id
        },
        include: [db.Store]
      }).then(result => {
        res.render("product", {
          isSeller: isSeller,
          userid: req.params.userid,
          productid: req.params.id,
          storeId: result.Store.id,
          store: result.Store.store_name,
          image: result.image,
          name: result.name,
          price: result.price,
          description: result.description,
          address: result.Store.address,
          font: result.Store.font,
          font_color: result.Store.font_color,
          body_color: result.Store.body_color,
          footer_color: result.Store.footer_color,
          accent_color: result.Store.accent_color
        });
      });
    });
  });

  app.post("/api/product", (req, res) => {
    db.Product.create(req.body).then(result => {
      res.json(result);
    });
  });

  app.delete("/api/product/:productid", (req, res) => {
    db.Product.destroy({
      where: {
        id: req.params.productid
      }
    }).then(result => {
      res.json(result);
    });
  });

};