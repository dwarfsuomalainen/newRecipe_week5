




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
const connect = require("http2");
const mongoDB = "mongodb://127.0.0.1:27017/testdb";
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db = mongoose.connection;   
db.on("error", console.error.bind(console, "MongoDB connection error"));
let recipesS = [];

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
    //console.log(req.body + "line51");
    Recipes.find({name: nameSEARCH}, (err, name) => {
        //console.log(nameSEARCH + " line 53");
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
                            instructions: req.body.instructions
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
app.post('/images', async (req, res)=> {
    //console.log(req);
    console.log(req.files);
    res.send(console.log('uploaded'));
    //res.redirect('/');
    /*try {
        if(!req.files){
            res.send({
                status: false,
                message: 'fail!'
            });
        } else {
            _.forEach(_.keysIn(req.files), (key) => {
                let photo = req.files[key];
                photo.mv('./image'+ photo.name);

                data.push({
                    name: photo.name,
                    mimetype: photo.mimetype,
                    size: photo.size
                });
            });
        
            res.send({
                status: true,
                message: 'uploaded',
                data: data
            });
        }

        } catch (err) {
            res.status(500).send(err);
    }*/
})
    



const port = process.env.port || 1234;

app.listen(port, ()=> console.log(`Server running on port ${port}`));