const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let categoryShema = new Schema({
    name: String
});


module.exports = mongoose.model("Category", categoryShema);

/*let categorySchema = new Schema({
    name: String
});
module.exports = mongoose.model("category", categorySchema);*/