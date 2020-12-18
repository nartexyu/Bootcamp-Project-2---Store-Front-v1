const db = require("../models");
const cart = require("../models/cart");

module.exports = app => {

    app.get("/cart/:userid", (req, res) => {
        db.Cart.findAll({
            where: {
                UserId: req.params.userid
            },
            include: {
                all: true
            }
        }).then(result => {
            let toSend = {
                userid: req.params.userid
            };
            if (result.length > 0) {
                toSend.hasItems = true;
                let data = [];
                result.forEach(item => {
                    let cart = {
                        cartid: item.id,
                        productid: item.ProductId,
                        quantity: item.quantity,
                        image: item.Product.image,
                        name: item.Product.name,
                        price: item.Product.price
                    };
                    cart.cost = cart.quantity * cart.price;
                    data.push(cart);
                });
                toSend.cart = data;
                let subtotal;
                if (data.length > 1) {
                    subtotal = data.reduce((a, b) => a.cost + b.cost).toFixed(2);
                } else {
                    subtotal = data[0].cost;
                };
                toSend.subtotal = subtotal;
            } else {
                toSend.hasItems = false;
                toSend.subtotal = 0.00;
            };
            res.render("cart", toSend);
        });
    });

    app.post("/api/cart", (req, res) => {
        db.Cart.create({
            quantity: req.body.quantity,
            UserId: req.body.userid,
            ProductId: req.body.productid
        }).then(result => {
            res.json(result);
        });
    });

    app.delete("/api/cart/:itemid", (req, res) => {
        db.Cart.destroy({
            where: {
                id: req.params.itemid
            }
        }).then(result => {
            res.json(result);
        });
    });

}