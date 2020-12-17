const path = require("path");

module.exports = app => {
    app.get("/test", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/test.html"));
        // res.sendFile(path.join(__dirname, "../public/index/index.html"));
    });

    app.get("/signup", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/cSignUp.html"));
    });

    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    // app.get("/storefront", (req, res) => {
    //     res.sendFile(path.join(__dirname, "../public/storefront.html"));
    // });
};