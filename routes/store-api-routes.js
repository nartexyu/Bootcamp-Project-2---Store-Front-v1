const db = require("../models");

module.exports = app => {

  // Get route for all stores and their products
  app.get("/landing/:userid", (req, res) => {
      const userid = req.params.userid;
      db.Store.findAll({
        include: [db.Product],
        order: [
            [db.Product, "popularity", "DESC"]
        ]
      }).then(result => {
        let data = [];
        result.forEach(store => {
          let info = {
            userid: userid,
            id: store.id,
            store: store.store_name,
            image: store.Products[0].image 
          };
          data.push(info);
        });
        res.render("landing", {
          data: data,
          userid: userid
        });
      });
    });

  // Get route for specific store by ID
  app.get("/store/:userid/:id", (req, res) => {
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
          userid: req.params.userid,
          id: result.id,
          font: result.font,
          background_image: result.background_image,
          store_name: result.store_name,
          product1Id: result.Products[0].id,
          productImage1: result.Products[0].image,
          productName1: result.Products[0].name,
          product2Id: result.Products[1].id,
          productImage2: result.Products[1].image,
          productName2: result.Products[1].name,
          product3Id: result.Products[2].id,
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

  app.get("/storeEditor/:storeid", (req, res) => {
    db.Store.findOne({
      where: {
        id: req.params.storeid
      },
      include: [db.Product]
    }).then(result => {
      let data = {
        userid: result.UserId,
        storeid: result.id,
        name: result.store_name
      };
      if (result.Products.length > 1) {
        data.hasProducts = true;
        data.products = result.Products;
      } else {
        data.hasProducts = false;
      };
      res.render("storeEditor", data);
    });
  });

  app.get("/contact/:userid/:id", (req, res) => {
    db.Store.findOne({
      where: {
        id: req.params.id
      }
    }).then(result => {
      res.render("contact", {
        userid: req.params.userid,
        id: result.id,
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
    console.log(req.body);
    db.User.findOne({
      where: {
        email: req.body.user.email
      }
    }).then(result => {
      if (!result) {
        db.User.create({
          email: req.body.user.email,
          password: req.body.user.password,
          first_name: req.body.user.first_name,
          last_name: req.body.user.last_name,
          isSeller: true
        }).then(data => {
          db.Store.create({
            store_name: req.body.store.store_name,
            UserId: data.dataValues.id
          }).then(response => {
              res.json(response);
          });
        });
      } else {
        db.User.update(
          {isSeller: true},
          {where: {
            id: result.dataValues.id
          }
        }).then(response => {
          db.Store.create({
            store_name: req.body.store.store_name,
            UserId: result.dataValues.id
          }).then(data => {
            res.json(data);
          });
        });
      };
    });
  });

  app.put("/api/store/:storeid", (req, res) => {
    db.Store.update(req.body, {
      where: {
        id: req.params.storeid
      }
    }).then(result => {
      res.json(result);
    });
  });
};