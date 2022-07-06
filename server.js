




const mongoose = require("mongoose");
const express = require("express");
const path = require('path');
const recipes = require('./Data_recipes');
const uuid = require('uuid');
//const exphbs = require('express-handlebars');
const { json } = require("body-parser");
const formData = require('express-form-data');
const fileUpload = require('express-fileupload');
const { data } = require("jquery");
const _ = require('lodash');
const bodyParser = require('body-parser');
const Recipes = require("./models/Recipes");
const Category = require("./models/Category");
const Images = require("./models/Images");
const connect = require("http2");
const mongoDB = "mongodb://127.0.0.1:27017/testdb";
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db = mongoose.connection;   
db.on("error", console.error.bind(console, "MongoDB connection error"));
let recipesS = [];

const multer  = require('multer')
const upload = multer({ dest: 'images/' })


//handlebars
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(bodyParser.json());
//app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
//app.set('view engine', 'handlebars');

/*app.get('/', (req, res) => res.render('index', {
    title : "Recipe",
    name : recipes[0].name,
    ingredients : recipes[0].ingredients ,
    instructions : recipes[0].instructions
    }));*/


 // categories for recipes 
 //db.createCollection("category",{
 //   name: String}
 // )
 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
        });
//static folder 
app.use(express.static(path.join(__dirname, 'public')));

app.get('/recipe/:food', (req, res, next)=> {
    let nameSEARCH = req.params.food;
    console.log(nameSEARCH + " line 50");
    Recipes.find({name: nameSEARCH}, (err, name) => {
        if (err) return next(err);
        if (name.length > 0) {return res.json(name)}
    else { res.status(404).send("There is no recipies of "+ nameSEARCH +" in a cookBook");
}
});

    
})
    
    //res.json({name: req.params.food, ingredients: recipes[0].ingredients, instructions: recipes[0].instructions});
    //res.json(recipes.filter(recipes => recipes.name === req.params.food));
    

// create a recipe

app.post('/recipe/', (req, res, next)=> {

    Recipes.findOne({name: req.body.name}, (err, name) => {
        if(err) return next(err);
        if(!name){
                console.log(name);
                new Recipes({name: req.body.name,
                            ingredients: req.body.ingredients,
                            instructions: req.body.instructions,
                            categories: req.body.categories
                            }).save((err) => {
                                if(err) return next (err);
                                return res.send(req.body);
                            });      
        } else { return res.status(403).send("This recipe already present");
    }
    })
 //console.log(req.body.name);   
/*



    const newRecipe = {
     name: req.body.name,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions } 
   recipes.push(newRecipe);
   //res.json(recipes);
   res.send(newRecipe);
   console.log(req.body.name);
   //res.redirect('/');
   //res.send(req.body);*/
   
})

//upload image
app.use(formData.parse());    
app.post('/images', upload.array(), (req, res, next) => { 
     new Images({name: req.body.filename,
                encoding: req.body.encoding,
                mimetype:req.body.mimetype,
                buffer: req.body.buffer
            }).save((err) => {
                if(err) return next (err);
                return res.send(req.body);
            }); 
})
    

// Categories 
app.get('/category/', (req, res, next)=>{

    Category.find({}, (err,name) => {
        if (err) return next(err);
        if (name.length > 0) {return res.json(name)}
        else { res.status(404).send("ERROR");
        res.send(res.body);
        console.log(res.body);
         console.log(res.json() + "line 154");
    }});
})


const port = process.env.port || 1234;

app.listen(port, ()=> console.log(`Server running on port ${port}`));