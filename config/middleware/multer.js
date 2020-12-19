const multer = require("multer");
const Datauri = require("datauri/parser");
const path = require("path");
const storage = multer.memoryStorage();

const multerUploads = multer({ storage }).single('file');

const parser = new Datauri();
const getContent = async req =>
    await parser.format(path.extname(req.file.originalname).toString(), req.file.buffer);

module.exports = { multerUploads, getContent };