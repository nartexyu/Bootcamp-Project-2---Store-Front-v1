const db = require("../models");

module.exports = app => {

  // Get route for all stores and their products
  app.get("/landing/:userid", (req, res) => {
    const userid = req.params.userid;
      db.User.findOne({
        where: {
          id: userid
        }
      }).then(response => {
        let isSeller = response.isSeller;
        db.Store.findAll({
          include: [db.Product, db.User],
          order: [
              [db.Product, "popularity", "DESC"]
          ]
        }).then(result => {
          console.log(result);
          let data = [];
          let openStores = result.filter(store => store.Products.length > 0);
          openStores.forEach(store => {
            let info = {
              userid: userid,
              id: store.id,
              store: store.store_name,
              image: store.Products[0].image 
            };
            data.push(info);
          });
          let info = {
            isSeller: isSeller,
            data: data,
            userid: userid
          };
          if (result.length > 5) {
            info.isFixed = false;
          } else {
            info.isFixed = true;
          };
          res.render("landing", info);
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
        let data = {
          userid: req.params.userid,
          id: result.id,
          font: result.font,
          background_image: result.background_image,
          store_name: result.store_name,
          tagline: result.tagline,
          about: result.about,
          about_image: result.about_image,
          address: result.address,
          font_color: result.font_color,
          body_color: result.body_color,
          footer_color: result.footer_color,
          accent_color: result.accent_color
        };
        if (result.Products.length > 0) {
        data.hasProducts = true;
        let products = [];
        for (let i = 0; i < 3; i++) {
          let info = {
            userid: req.params.userid,
            productid: result.Products[i].id,
            image: result.Products[i].image,
            name: result.Products[i].name
          };
          products.push(info);
        }
        data.products = products;
      } else {
        data.hasProducts = false;
      };
      res.render("storefront", data);
    });
  });

  app.get("/storeEditor/:userid", (req, res) => {
    db.Store.findOne({
      where: {
        UserId: req.params.userid
      },
      include: [db.Product]
    }).then(result => {
      // res.json(result);
      let data = {
        userid: result.UserId,
        storeid: result.id,
        name: result.store_name
      };
      if (result.Products.length > 0) {
        data.hasProducts = true;
        let products = [];
        result.Products.forEach(item => {
          let info = {
            id: item.id,
            image: item.image,
            name: item.name
          };
          products.push(info);
        })
        data.products = products;
      } else {
        data.hasProducts = false;
      };
      console.log(data);
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