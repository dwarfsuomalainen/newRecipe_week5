const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let recipeShema = new Schema({

    name: String,
    ingredients: [String],
    instructions: [String],
    categories: [String]
});


module.exports = mongoose.model("Recipes", recipeShema);

/*let categorySchema = new Schema({
    name: String
});
module.exports = mongoose.model("category", categorySchema);*/
