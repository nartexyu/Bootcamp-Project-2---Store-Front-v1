const path = require("path");

module.exports = app => {

    app.get("/csignup", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/cSignUp.html"));
    });

    app.get("/osignup", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/oSignUp.html"));
    });
    app.get("/osignin", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/storeIndex.html"));
    })

    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

};