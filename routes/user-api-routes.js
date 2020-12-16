const db = require("../models");
const passport = require("../config/passport");

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
        }).then(function() {
            res.redirect(307, "/api/login");
        }).catch(function(err) {
            console.log(err);
        });
    });
};