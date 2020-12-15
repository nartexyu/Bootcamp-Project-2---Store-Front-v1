const multer = require("multer");
const Datauri = require("datauri/parser");
const path = require("path");
const storage = multer.memoryStorage();
const util = require("util");
const parser = new Datauri();
const multerUploads = multer({ storage }).single('file');
// const getContent = async (req) => {
//     await parser.format(req.file.buffer)
// }
// const dUri = new Datauri();
// console.log(dUri);
const getContent = async req =>
    await parser.format(path.extname(req.file.originalname).toString(),
    req.file.buffer);

module.exports = { multerUploads, getContent };