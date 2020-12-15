const path = require("path");

module.exports = app => {
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../test.html"));
        // res.sendFile(path.join(__dirname, "../public/index/index.html"));
    });

    app.get("/signup", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/signup/cSignUp.html"))
    })
}