
const mongoose = require("mongoose");
const express = require("express");
const path = require('path');
const recipes = require('./Data_recipes');
const uuid = require('uuid');
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
const async = require("async");
const multer  = require('multer');
/*const storage = multer.diskStorage({
destination: (req,file, cb) => {
    cb(null, './images')
},
filename: (req, file, cb) => {
    cb(null, file.originalname)  
}
})*/


const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(bodyParser.json());


//handlebars
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
 
 /*app.get('/favicon.ico', function(req, res) {
    res.send(204);
});*/
    app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
    });

    //static folder 
app.use(express.static(path.join(__dirname, 'public')));

app.get('/recipe/:food', (req, res, next)=> {
    let nameSEARCH = req.params.food;
    console.log(req.params.food)
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
                            categories: req.body.categories,
                            images: req.body.images
                            }).save((err) => {console.log(req.body);
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
   
});

//upload image

//app.use(formData.parse()); 
// this creates objects to the collection images with a loop from an array   
/*app.post('/images', upload.array('camera-file-input', 5), function (req, res) { 
    //console.log(req.keys + "line130")
    console.log(req.files);
    //console.log(arr);
    var arrTosend = [];
    let response1 ;
    for (let i= 0; i < req.files.length; i++)
            new Images({name: req.files[i].originalname,
            encoding: req.files[i].encoding,
            mimetype:req.files[i].mimetype,
            buffer: req.files[i].buffer}).save((err) => {
        if(err) return next (err);
        //let response1 = 
        //console.log(docInserted);
        response1 = Images.find({}).sort( { "_id": -1 } ).limit(1);
        let resp1 = response1;
        //arrTosend.push(resp1[i]);
        //console.log(resp1);
        //console.log(arrTosend + " 148 ");
        
    })
        res.send(response1);
        //console.log(arrTosend + " 154 ");
        
        
})*/


     /*new Images({name: req.body.filename,
                encoding: req.body.encoding,
                mimetype:req.body.mimetype,
                buffer: req.body.buffer
            }).save((err) => {
                if(err) return next (err);
                return res.send(req.body);
            }); */

           
/*// this creates documents to collection images and return ids of created documents
app.post('/images', upload.array('camera-file-input', 5), (req,res) => {
let response1= [];
let response2= {};
    for (let i= 0; i < req.files.length; i++){
        //let resp = response2;
        let obj = {name: req.files[i].originalname,
            encoding: req.files[i].encoding,
            mimetype:req.files[i].mimetype,
            buffer: req.files[i].buffer};
            response1.push(obj);}
           
    Images.insertMany(response1, function(error,response) {
        if(error) throw error;
        for (let i=0; i< response.length; i++) {
        console.log(response[i]._id + "186");
        let idS = response[i]._id;
        response2[i] = (idS);
        }
        var promise1 = new Promise((resolve, reject) => {
            resolve(response2);
        })
        promise1.then((value) => { 
        console.log(value);
        res.json(value)
    });
        console.log(response2);
        console.log(res);      
       /*if(error) throw error;
       let imgs = Images.find({}, (err,res) => {
        if (err) return next(err);
        }).sort({"_id" : -1}).limit(1);

        for (let i=0; i< imgs.length; i++){
         response2.push.imgs[i]._id;
         console.log(response2 + "198");
        console.log(res);
        }
})
});*/


app.post("/images", upload.array("camera-file-input", 5), (req, res) => {
    let response1 = [];
    let response2 = {};
    for (let i = 0; i < req.files.length; i++) {
      let obj = {
        name: req.files[i].originalname,
        encoding: req.files[i].encoding,
        mimetype: req.files[i].mimetype,
        buffer: req.files[i].buffer,
      };
      response1.push(obj);
    }
  
    Images.insertMany(response1, function (error, response) {
      if (error) throw error;
      for (let i = 0; i < response.length; i++) {
        console.log(response[i]._id + "186");
        let idS = response[i]._id;
        response2[i] = idS;
      }
      console.log(response1); 
      console.log(response2); 
      res.json(response2);
  
      /*if(error) throw error;
             let imgs = Images.find({}, (err,res) => {
              if (err) return next(err);
              }).sort({"_id" : -1}).limit(1);
      
              for (let i=0; i< imgs.length; i++){
               response2.push.imgs[i]._id;
               console.log(response2 + "198");
              console.log(res);
              }*/
    });
  });


// Categories 
app.get('/category/', (req, res, next)=>{

    Category.find({}, (err,name) => {
        let emptyArr = [];
        if (err) return next(err);
        if (name.length > 0) {return res.json(name)}
        else { res.send(emptyArr);
        //res.send(res.body);
        //console.log(res.body);
        //console.log(res.json() + "line 206");
    }});
});


//Image ids 
app.get('/images/:imageId', (req, res, next)=>{
    let idfromDB = req.params.imageId
    Images.find({_id: idfromDB}, (err,_id) => {
        if (err) return next(err);
        if (_id.length > 0) {return res.send(res.buffer)}   // !!!!! [0]
        else { res.status(404).send("ERROR");
        //res.send(json);
        console.log(res.body);
        console.log(res + "line 271");
    }});

});

const port = process.env.port || 1234;

app.listen(port, ()=> console.log(`Server running on port ${port}`));


