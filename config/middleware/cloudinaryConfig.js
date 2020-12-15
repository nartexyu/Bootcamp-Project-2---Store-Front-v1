const { config, uploader } = require("cloudinary");
const dotenv = require("dotenv").config();

const cloudinaryConfig = (req, res, next) => {
    config({
        cloud_name: process.env.cloudname,
        api_key: process.env.apikey,
        api_secret: process.env.secret
    });
    next();
};

module.exports = { cloudinaryConfig, uploader };