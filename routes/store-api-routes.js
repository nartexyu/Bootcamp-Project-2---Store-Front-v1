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
              id: store.id,
              store: store.store_name,
              image: store.Products[0].image 
            };
            data.push(info);
          });
          res.render("landing", {data: data});
        });
      });
  
    // Get route for specific store by ID
    app.get("/store/:id", (req, res) => {
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

    app.get("/contact/:id", (req, res) => {
      db.Store.findOne({
        where: {
          id: req.params.id
        }
      }).then(result => {
        res.render("contact", {
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
        console.log(result.dataValues);
        if (!result) {
          db.User.create({
            email: req.body.user.email,
            password: req.body.user.password,
            first_name: req.body.user.first_name,
            last_name: req.body.user.last_name,
            isSeller: true
          }).then(data => {
            console.log(data.dataValues.id);
            db.Store.create({
              store_name: req.body.store.store_name,
              address: req.body.store.address,
              UserId: data.dataValues.id
            }).then(response => {
                console.log(response);
            })
          })
        } else {
          db.Store.create({
            store_name: req.body.store.store_name,
            address: req.body.store.address,
            UserId: result.dataValues.id
          }).then(data => {
            db.User.update(
              {isSeller: true},
              {where: {
                id: result.dataValues.id
              }
            }).then(response => {
              res.json(response);
            })
          })
        }
      })
        // db.Store.create({
        //   store_name: req.body.store_name,
        //   address: req.body.address,
        //   about: req.body.about,
        //   UserId: req.body.UserId
        // }).then(result => {
        //   res.json(result);
        // });
    });
};