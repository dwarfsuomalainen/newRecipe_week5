const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let categoryShema = new Schema({
    name: String
}, {collection: "category"});


module.exports = mongoose.model("Category", categoryShema);
